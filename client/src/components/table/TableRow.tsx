import { ActionButton } from "../../components/ui/ActionButtons";

type UserRowData = {
  id: number;
  email: string;
  name: string;
  createdAt: string;
};

type Props = {
  user: UserRowData;
  deleting?: boolean;
  onDelete: (user: UserRowData) => void;
  formatDate: (iso: string) => string;
};

const td = "px-4 py-4 text-b-text-1 text-primary";
const tr = "border-t border-black/5";

export function TableRow({ user, deleting = false, onDelete, formatDate }: Props) {
  return (
    <tr className={tr}>
      <td className={td}>{user.id}</td>
      <td className={td}>{user.email}</td>
      <td className={td}>{user.name}</td>
      <td className={td}>{formatDate(user.createdAt)}</td>
      <td className="px-4 py-4 text-right">
        <ActionButton
          type="button"
          variant="danger"
          size="sm"
          onClick={() => onDelete(user)}
          disabled={deleting}
        >
          {deleting ? "УДАЛЕНИЕ..." : "УДАЛИТЬ"}
        </ActionButton>
      </td>
    </tr>
  );
}