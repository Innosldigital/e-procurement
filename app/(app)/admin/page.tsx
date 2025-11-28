import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { getPendingCompanies, getPendingSuppliers, approveCompanyOnboarding, approveSupplierOnboarding, getAllCompanies, getAllSuppliers } from "@/lib/actions/admin-approval-actions"
import { auth, clerkClient } from "@clerk/nextjs/server"

export default async function AdminPage() {
  const { userId, sessionClaims } = await auth()
  const role = String((sessionClaims as any)?.publicMetadata?.role || '')
  let effectiveRole = role
  if (userId) {
    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    const emails = (user?.emailAddresses || []).map((e: any) => String(e.emailAddress).toLowerCase())
    if (emails.includes('keitamorie@gmail.com')) {
      effectiveRole = 'super_admin'
      if (role !== 'super_admin') {
        await client.users.updateUser(userId, { publicMetadata: { role: 'super_admin' } })
      }
    }
  }
  const canAccess = effectiveRole === 'admin' || effectiveRole === 'super_admin'

  const companiesRes = await getPendingCompanies()
  const suppliersRes = await getPendingSuppliers()
  const allCompaniesRes = await getAllCompanies()
  const allSuppliersRes = await getAllSuppliers()
  const companies = companiesRes.success ? companiesRes.data : []
  const suppliers = suppliersRes.success ? suppliersRes.data : []
  const allCompanies = allCompaniesRes.success ? allCompaniesRes.data : []
  const allSuppliers = allSuppliersRes.success ? allSuppliersRes.data : []

  const pendingUsers = [
    ...companies.map((c: any) => ({
      _id: c._id,
      role: 'company',
      name: c.name,
      entityId: c.companyId,
      ownerUserId: c.ownerUserId,
      contact: c.onboarding?.contactPerson || null,
    })),
    ...suppliers.map((s: any) => ({
      _id: s._id,
      role: 'supplier',
      name: s.name,
      entityId: s.supplierId,
      ownerUserId: s.ownerUserId,
      onboarding: s.onboarding || null,
    })),
  ]

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold mb-1">Admin</h1>
          <p className="text-sm text-muted-foreground">Approve onboarding requests to grant access.</p>
        </div>
      </div>

      {!canAccess ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Access denied</CardTitle>
            <CardDescription className="text-xs">Only admins can approve onboarding.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Pending users</CardTitle>
              <StatusBadge status={`${pendingUsers.length} pending`} />
            </div>
            <CardDescription className="text-xs">Approve to grant full system access.</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingUsers.length === 0 ? (
              <div className="text-xs text-muted-foreground">No pending users.</div>
            ) : (
              <div className="space-y-2">
                {pendingUsers.map((u: any) => (
                  <div key={u._id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <div className="text-sm font-medium">{u.name}</div>
                      <div className="text-xs text-muted-foreground">{u.role} • {u.entityId}</div>
                      {u.role === 'supplier' ? (
                        <div className="text-xs text-muted-foreground">{u.onboarding?.contactPerson} • {u.onboarding?.phone} • {u.onboarding?.email}</div>
                      ) : (
                        <div className="text-xs text-muted-foreground">{u.contact?.name} • {u.contact?.phone} • {u.contact?.email}</div>
                      )}
                    </div>
                    {u.role === 'company' ? (
                      <form
                        action={async () => {
                          'use server'
                          await approveCompanyOnboarding(String(u.entityId))
                        }}
                      >
                        <Button size="sm">Approve</Button>
                      </form>
                    ) : (
                      <form
                        action={async () => {
                          'use server'
                          await approveSupplierOnboarding(String(u.entityId))
                        }}
                      >
                        <Button size="sm">Approve</Button>
                      </form>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">All users</CardTitle>
              <StatusBadge status={`${allCompanies.length + allSuppliers.length} total`} />
            </div>
            <CardDescription className="text-xs">View all onboarded entities and their status.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[...allCompanies.map((c: any) => ({
                _id: c._id,
                role: 'company',
                name: c.name,
                entityId: c.companyId,
                approved: c.approved,
                contact: c.onboarding?.contactPerson || null,
              })),
              ...allSuppliers.map((s: any) => ({
                _id: s._id,
                role: 'supplier',
                name: s.name,
                entityId: s.supplierId,
                approved: s.approved,
                onboarding: s.onboarding || null,
              }))].map((u: any) => (
                <div key={u._id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <div className="text-sm font-medium">{u.name}</div>
                    <div className="text-xs text-muted-foreground">{u.role} • {u.entityId}</div>
                    {u.role === 'supplier' ? (
                      <div className="text-xs text-muted-foreground">{u.onboarding?.contactPerson} • {u.onboarding?.phone} • {u.onboarding?.email}</div>
                    ) : (
                      <div className="text-xs text-muted-foreground">{u.contact?.name} • {u.contact?.phone} • {u.contact?.email}</div>
                    )}
                  </div>
                  <StatusBadge status={u.approved ? 'Approved' : 'Pending'} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">All users</CardTitle>
              <StatusBadge status={`${allCompanies.length + allSuppliers.length} total`} />
            </div>
            <CardDescription className="text-xs">View all onboarded entities and their status.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[...allCompanies.map((c: any) => ({
                _id: c._id,
                role: 'company',
                name: c.name,
                entityId: c.companyId,
                approved: c.approved,
                contact: c.onboarding?.contactPerson || null,
              })),
              ...allSuppliers.map((s: any) => ({
                _id: s._id,
                role: 'supplier',
                name: s.name,
                entityId: s.supplierId,
                approved: s.approved,
                onboarding: s.onboarding || null,
              }))].map((u: any) => (
                <div key={u._id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <div className="text-sm font-medium">{u.name}</div>
                    <div className="text-xs text-muted-foreground">{u.role} • {u.entityId}</div>
                    {u.role === 'supplier' ? (
                      <div className="text-xs text-muted-foreground">{u.onboarding?.contactPerson} • {u.onboarding?.phone} • {u.onboarding?.email}</div>
                    ) : (
                      <div className="text-xs text-muted-foreground">{u.contact?.name} • {u.contact?.phone} • {u.contact?.email}</div>
                    )}
                  </div>
                  <StatusBadge status={u.approved ? 'Approved' : 'Pending'} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </>
      )}
    </div>
  )
}
