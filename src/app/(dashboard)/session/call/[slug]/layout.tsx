// PROJECT IMPORTS
import DashboardLayout from 'layout/DashboardLayout';
import AuthGuard from 'utils/route-guard/AuthGuard';
function getData(slug: string) {
  const JWT = await generateSignature(slug, 1);
  return JWT;
}
// ==============================|| DASHBOARD LAYOUT ||============================== //

export default function Layout({ children }: { children: React.ReactNode }) {
  return (

      <AuthGuard>
        <DashboardLayout>{children}</DashboardLayout>
      </AuthGuard>

  );
}
