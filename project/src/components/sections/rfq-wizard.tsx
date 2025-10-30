'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import { useReducedMotion, motion } from 'framer-motion';

const schema = yup.object({
  company: yup.string().required('company'),
  email: yup.string().email('email').required('email'),
  phone: yup.string().required('required'),
  partType: yup.string().required('required'),
  material: yup.string().required('required'),
  quantity: yup.number().min(1).required('required'),
  tolerance: yup.string().required('required'),
  files: yup
    .mixed<FileList>()
    .test('file-required', 'file', (value) => (value?.length ?? 0) > 0)
    .test('file-size', 'size', (value) => {
      if (!value?.length) return false;
      return Array.from(value).every((file) => file.size <= 200 * 1024 * 1024);
    })
    .test('file-type', 'file', (value) => {
      if (!value?.length) return false;
      return Array.from(value).every((file) => /\.(step|stp|iges|igs|dxf|pdf)$/i.test(file.name));
    }),
  leadTime: yup.string().required('required'),
  incoterms: yup.string().required('required'),
  toleranceClass: yup.string().required('required'),
  captcha: yup.string().required('captcha')
});

const stepOrder: Array<keyof RFQFormValues> = [
  'company',
  'partType',
  'material',
  'quantity',
  'tolerance',
  'files',
  'leadTime',
  'captcha'
];

const stepDescriptions: Record<keyof RFQFormValues, string> = {
  company: '',
  partType: '',
  material: '',
  quantity: '',
  tolerance: '',
  files: '',
  leadTime: '',
  captcha: '',
  toleranceClass: '',
  message: '',
  incoterms: ''
};

export interface RFQFormValues {
  company: string;
  email: string;
  phone: string;
  partType: string;
  material: string;
  quantity: number;
  tolerance: string;
  toleranceClass: string;
  files: FileList;
  leadTime: string;
  incoterms: string;
  message?: string;
  captcha: string;
}

export function RFQWizard({ locale }: { locale: string }) {
  const t = useTranslations('sections.rfq');
  const errorMessages = t('errors', { returnObjects: true }) as Record<string, string>;
  const labels = t('labels', { returnObjects: true }) as Record<string, string>;
  const buttons = t('buttons', { returnObjects: true }) as Record<string, string>;
  const stepLabels = t('steps', { returnObjects: true }) as string[];
  const prefersReducedMotion = useReducedMotion();

  const methods = useForm<RFQFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      quantity: 1,
      incoterms: 'DAP',
      toleranceClass: 'ISO 2768-fH'
    },
    mode: 'onChange'
  });
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const steps = stepOrder.map((key, index) => ({
    key,
    label: stepLabels[index] ?? key,
    description: stepDescriptions[key] ?? ''
  }));

  const goNext = async () => {
    const currentKey = steps[step].key;
    const valid = await methods.trigger(currentKey);
    if (valid) {
      setStep((s) => Math.min(s + 1, steps.length - 1));
    }
  };

  const goPrev = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = methods.handleSubmit(async (values) => {
    try {
      setProgress(20);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setProgress(60);
      await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, locale })
      });
      setProgress(100);
      setSubmitted(true);
      window.dispatchEvent(new CustomEvent('analytics', { detail: { event: 'rfq_submitted', values } }));
    } catch (error) {
      console.error(error);
    }
  });

  const renderField = (currentStep: (typeof steps)[number]) => {
    switch (currentStep.key) {
      case 'company':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <Field name="company" label={labels.company} placeholder="AEM Precision" />
            <Field name="email" label={labels.email} type="email" placeholder="rfq@aemprecision.com" />
            <Field name="phone" label={labels.phone} placeholder="+90" />
          </div>
        );
      case 'partType':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <Field name="partType" label={labels.partType} placeholder="Rotor, gear, manifold..." />
            <Field name="toleranceClass" label={labels.toleranceClass} placeholder="ISO 2768" />
          </div>
        );
      case 'material':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <Field name="material" label={labels.material} placeholder="Inconel 718, 17-4PH" />
            <Field name="message" label={labels.message} as="textarea" rows={4} placeholder="Heat treatment, coating, hardness..." />
          </div>
        );
      case 'quantity':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <Field name="quantity" label={labels.quantity} type="number" min={1} />
            <Field name="leadTime" label={labels.leadTime} placeholder="4-6 weeks" />
          </div>
        );
      case 'tolerance':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <Field name="tolerance" label={labels.tolerance} placeholder="±0.01 mm / Ra 0.2 μm" />
            <Field name="incoterms" label={labels.incoterms} placeholder="DAP, FOB..." />
          </div>
        );
      case 'files':
        return <FileField name="files" label={labels.files} progress={progress} onProgress={setProgress} errors={errorMessages} />;
      case 'leadTime':
        return (
          <div className="grid gap-4">
            <Field name="leadTime" label={labels.leadTime} placeholder="15 business days" />
            <Field name="incoterms" label={labels.incoterms} placeholder="DAP Izmir" />
          </div>
        );
      case 'captcha':
        return (
          <div className="space-y-4">
            <Field name="captcha" label={labels.captcha} placeholder="Token" />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              reCAPTCHA v3 doğrulaması için site anahtarınızı <code>NEXT_PUBLIC_RECAPTCHA_KEY</code> değişkeninden çekiyoruz.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <section className="bg-background-light py-20 dark:bg-background-dark">
        <div className="container mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">{t('title')}</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">{t('success')}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="rfq" className="bg-background-light py-20 dark:bg-background-dark">
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">{t('title')}</h2>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{t('description')}</p>
        <FormProvider {...methods}>
          <form className="mt-10 space-y-8" onSubmit={onSubmit} noValidate>
            <Stepper currentStep={step} steps={steps} />
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-900">
              <motion.div
                key={steps[step].key}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {renderField(steps[step])}
              </motion.div>
              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={step === 0}
                  className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 disabled:opacity-50 dark:border-slate-600 dark:text-slate-300"
                >
                  {buttons.prev}
                </button>
                {step < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {buttons.next}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-slate-900 shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {buttons.submit}
                  </button>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
}

interface FieldProps {
  name: keyof RFQFormValues;
  label: string;
  type?: string;
  placeholder?: string;
  rows?: number;
  as?: 'textarea';
  min?: number;
}

function Field({ name, label, type = 'text', placeholder, rows, as, min }: FieldProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  const InputTag = as === 'textarea' ? 'textarea' : 'input';

  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
      {label}
      <InputTag
        {...register(name)}
        type={as === 'textarea' ? undefined : type}
        placeholder={placeholder}
        min={min}
        rows={rows}
        className={clsx(
          'rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-200'
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error ? (
        <span id={`${name}-error`} className="text-xs text-red-500">
          {error}
        </span>
      ) : null}
    </label>
  );
}

interface FileFieldProps {
  name: keyof RFQFormValues;
  label: string;
  progress: number;
  onProgress: (value: number) => void;
  errors: Record<string, string>;
}

function FileField({ name, label, progress, onProgress, errors }: FileFieldProps) {
  const {
    register,
    formState: { errors: formErrors },
    watch
  } = useFormContext();
  const error = formErrors[name]?.message as string | undefined;
  const files = watch(name);

  return (
    <div className="space-y-4">
      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
        <input
          {...register(name)}
          type="file"
          multiple
          accept=".step,.stp,.iges,.igs,.dxf,.pdf"
          className={clsx(
            'rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-6 text-sm text-slate-600 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-200'
          )}
          onChange={(event) => {
            onProgress(5);
            const total = event.target.files?.length ?? 0;
            if (total > 0) {
              onProgress(40);
              setTimeout(() => onProgress(80), 400);
            }
          }}
          aria-invalid={Boolean(error)}
        />
      </label>
      {files?.length ? (
        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
          {Array.from(files).map((file) => (
            <div key={file.name} className="flex items-center justify-between rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
              <span>{file.name}</span>
              <span className="tabular-nums">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
            </div>
          ))}
        </div>
      ) : null}
      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="h-2 rounded-full bg-primary transition-all"
          style={{ width: `${Math.min(progress, 100)}%` }}
          aria-hidden
        />
      </div>
      {error ? (
        <p className="text-xs text-red-500">{errors[error] ?? error}</p>
      ) : (
        <p className="text-xs text-slate-500 dark:text-slate-400">Desteklenen formatlar: STEP, IGES, DXF, PDF · Maksimum 200MB</p>
      )}
    </div>
  );
}

function Stepper({ currentStep, steps }: { currentStep: number; steps: Array<{ key: keyof RFQFormValues; label: string; description: string }> }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-4">
      {steps.map((item, index) => (
        <li key={item.key} className="flex items-center gap-3">
          <span
            className={clsx(
              'flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition',
              index < currentStep
                ? 'border-secondary bg-secondary text-slate-900'
                : index === currentStep
                ? 'border-primary bg-primary text-white'
                : 'border-slate-300 text-slate-500 dark:border-slate-600 dark:text-slate-400'
            )}
          >
            {index + 1}
          </span>
          <div className="text-sm">
            <div className="font-semibold text-slate-700 dark:text-slate-200">{item.label}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
