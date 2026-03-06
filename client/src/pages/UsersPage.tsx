import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { deleteUserById, listUsers, type UserRow } from "../api/users";
import Header from "../components/Header";
import PageShell from "../components/layout/PageShell";
import ConfirmModal from "../components/ui/ConfirmModal";
import { ActionButton } from "../components/ui/ActionButtons";
import { TableHead } from "../components/table/TableHead";
import { TableRow } from "../components/table/TableRow";
import { UserCardRow } from "../components/table/UserCardRow";

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [q, setQ] = useState("");
  const [userToDelete, setUserToDelete] = useState<UserRow | null>(null);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return users;

    return users.filter(
      (u) =>
        u.email.toLowerCase().includes(s) ||
        u.name.toLowerCase().includes(s) ||
        String(u.id).includes(s)
    );
  }, [users, q]);

  async function load() {
    try {
      setLoading(true);
      const data = await listUsers();
      setUsers(data);
    } catch (e: any) {
      toast.error(e?.message || "Не удалось загрузить пользователей");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openDeleteModal(user: UserRow) {
    setUserToDelete(user);
  }

  function closeDeleteModal() {
    if (deletingId !== null) return;
    setUserToDelete(null);
  }

  async function confirmDelete() {
    if (!userToDelete) return;

    try {
      setDeletingId(userToDelete.id);
      const t = toast.loading("Удаление...");

      await deleteUserById(userToDelete.id);
      setUsers((prev) => prev.filter((x) => x.id !== userToDelete.id));

      toast.dismiss(t);
      toast.success("Пользователь удалён");
      setUserToDelete(null);
    } catch (e: any) {
      toast.error(e?.message || "Ошибка удаления");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      <Header />

      <PageShell>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-center text-b-title-2 text-primary sm:text-b-title-1 lg:text-left">
              Пользователи
            </h1>

            <p className="mt-1 text-center text-b-text-2 text-secondary lg:text-left">
              Всего: {users.length}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch lg:min-w-105">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Поиск: id / email / имя"
              className="h-12 w-full rounded-xl border border-[#BCC3D080] bg-input-bg px-4 text-primary outline-none focus:border-blue-p/40 focus:ring-2 focus:ring-blue-h"
            />

            <ActionButton onClick={load} className="h-12 w-full px-6 sm:w-auto">
              ОБНОВИТЬ
            </ActionButton>
          </div>
        </div>

        <div className="mt-6 space-y-3 min-[840px]:hidden">
          {loading ? (
            <div className="rounded-2xl border border-black/5 bg-white px-4 py-6 text-b-text-1 text-secondary">
              Загрузка...
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-black/5 bg-white px-4 py-6 text-b-text-1 text-secondary">
              Пользователи не найдены
            </div>
          ) : (
            filtered.map((u) => (
              <UserCardRow
                key={u.id}
                user={u}
                deleting={deletingId === u.id}
                onDelete={openDeleteModal}
                formatDate={formatDate}
              />
            ))
          )}
        </div>

        <div className="mt-6 hidden overflow-hidden rounded-2xl border border-black/5  min-[840px]:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-180">
              <TableHead
                columns={[
                  { key: "id", title: "ID" },
                  { key: "email", title: "Email" },
                  { key: "name", title: "Имя" },
                  { key: "createdAt", title: "Создан" },
                  { key: "actions", title: "Действия", align: "right" },
                ]}
              />

              <tbody>
                {loading ? (
                  <tr>
                    <td className="px-4 py-6 text-b-text-1 text-secondary" colSpan={5}>
                      Загрузка...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-b-text-1 text-secondary" colSpan={5}>
                      Пользователи не найдены
                    </td>
                  </tr>
                ) : (
                  filtered.map((u) => (
                    <TableRow
                      key={u.id}
                      user={u}
                      deleting={deletingId === u.id}
                      onDelete={openDeleteModal}
                      formatDate={formatDate}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </PageShell>

      <ConfirmModal
        open={!!userToDelete}
        title="Удалить пользователя?"
        description={ userToDelete ? `Пользователь #${userToDelete.id} (${userToDelete.email}) будет удалён без возможности восстановления.` : "" }
        confirmText="Удалить"
        cancelText="Отмена"
        loading={deletingId !== null}
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
      />
    </>
  );
}