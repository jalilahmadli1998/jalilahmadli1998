import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

jest.mock('next-intl/link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
}));

describe('Breadcrumbs', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <Breadcrumbs
        locale="tr"
        items={[
          { label: 'Hizmetler', href: '/tr/services' },
          { label: 'CNC İşleme' }
        ]}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
