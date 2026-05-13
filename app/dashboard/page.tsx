import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import EmployeeForm from "./employee-form";
import EmployeeList from "./employee-list";
import DocumentForm from "./document-form";
import DocumentList from "./document-list";
import AuditLogList from "./audit-log-list";
import StatsCards from "./stats-cards";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const { name, email } = session.user;
  const role = session.user.role;
  const canCreateEmployees = role === "ADMIN";
  const canViewEmployeeList = role === "ADMIN" || role === "MANAGER";
  const canUploadDocuments = role === "ADMIN" || role === "EMPLOYEE";
  const [totalEmployees, activeEmployees, pendingDocuments, approvedDocuments] =
    await Promise.all([
      prisma.employee.count(),
      prisma.employee.count({ where: { status: "ACTIVE" } }),
      prisma.document.count({ where: { status: "PENDING" } }),
      prisma.document.count({ where: { status: "APPROVED" } }),
    ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 px-4 py-8 md:px-6 md:py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-white/60 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:text-3xl">
            📊 Dashboard Header
          </h1>
          <p className="text-gray-600 mb-6">
            Welcome to your dashboard. Here are your account details:
          </p>
          <dl className="space-y-3">
            <div className="flex justify-between text-sm">
              <dt className="font-medium text-gray-700">Name</dt>
              <dd className="text-gray-900">{name}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="font-medium text-gray-700">Email</dt>
              <dd className="text-gray-900">{email}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="font-medium text-gray-700">Role</dt>
              <dd className="text-gray-900">{role}</dd>
            </div>
          </dl>
        </div>

        <StatsCards
          stats={{
            totalEmployees,
            activeEmployees,
            pendingDocuments,
            approvedDocuments,
          }}
        />

        <div className="bg-white/60 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            👤 Employee Management
          </h2>
          <div className="space-y-6">
            {canCreateEmployees && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Create Employee
                </h3>
                <EmployeeForm />
              </div>
            )}
            {canViewEmployeeList && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Employee List
                </h3>
                <EmployeeList />
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            📁 Document Management
          </h2>
          {canUploadDocuments && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Upload Document
              </h3>
              <DocumentForm />
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Document List
          </h3>
          <DocumentList role={role} />
        </div>

        {role === "ADMIN" && (
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              🕵️ Audit Logs
            </h2>
            <AuditLogList />
          </div>
        )}
      </div>
    </div>
  );
}

