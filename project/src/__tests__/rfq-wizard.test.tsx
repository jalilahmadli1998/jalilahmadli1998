import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RFQWizard } from '@/components/sections/rfq-wizard';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string, { returnObjects }: { returnObjects?: boolean } = {}) => {
    if (returnObjects) {
      if (key === 'sections.rfq.errors') {
        return {
          required: 'Bu alan zorunlu',
          email: 'E-posta hatalı',
          file: 'Dosya yükleyin',
          size: 'Dosya boyutu büyük',
          captcha: 'Captcha doğrulanamadı'
        };
      }
      if (key === 'sections.rfq.labels') {
        return {
          company: 'Firma',
          email: 'E-posta',
          phone: 'Telefon',
          partType: 'Parça',
          toleranceClass: 'Tolerans',
          material: 'Malzeme',
          message: 'Notlar',
          quantity: 'Adet',
          leadTime: 'Teslim',
          tolerance: 'Tolerans',
          incoterms: 'Incoterms',
          files: 'Dosyalar',
          captcha: 'Captcha'
        };
      }
      if (key === 'sections.rfq.buttons') {
        return { prev: 'Geri', next: 'İleri', submit: 'Gönder' };
      }
      if (key === 'sections.rfq.steps') {
        return ['1', '2', '3', '4', '5', '6', '7', '8'];
      }
    }
    return 'Test';
  }
}));

jest.mock('next-intl/link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
}));

describe('RFQWizard', () => {
  it('validates required fields before submission', async () => {
    render(<RFQWizard locale="tr" />);

    const submitButton = screen.getByRole('button', { name: /ileri/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText('Bu alan zorunlu').length).toBeGreaterThan(0);
    });
  });
});
