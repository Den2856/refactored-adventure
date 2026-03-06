import type { UserRow } from "../../api/users";
import { ActionButton } from "../ui/ActionButtons";

type UserCardRowProps = {
  user: UserRow;
  deleting: boolean;
  onDelete: (user: UserRow) => void;
  formatDate: (iso: string) => string;
};

export function UserCardRow({ user, deleting, onDelete, formatDate, }: UserCardRowProps) {
  return (
    <div className="rounded-2xl border border-[#BCC3D080] bg-white p-4">
      <div className="space-y-2 text-b-text-1">
        <div>
          <span className="text-secondary">ID:</span>{" "}
          <span className="text-primary">{user.id}</span>
        </div>

        <div>
          <span className="text-secondary">Email:</span>{" "}
          <span className="text-primary break-all">{user.email}</span>
        </div>

        <div>
          <span className="text-secondary">Имя:</span>{" "}
          <span className="text-primary">{user.name}</span>
        </div>

        <div>
          <span className="text-secondary">Создан:</span>{" "}
          <span className="text-primary">{formatDate(user.createdAt)}</span>
        </div>
      </div>

      <ActionButton
        type="button"
        variant="danger"
        size="sm"
        onClick={() => onDelete(user)}
        disabled={deleting}
        className="mt-4 w-full"
      >
        {deleting ? "УДАЛЕНИЕ..." : "УДАЛИТЬ"}
      </ActionButton>
    </div>
  );
}