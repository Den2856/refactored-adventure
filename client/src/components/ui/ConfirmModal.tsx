import { ActionButton } from "./ActionButtons";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({ open, title, description, confirmText = "Удалить", cancelText = "Отмена", loading = false, onConfirm, onCancel }: ConfirmModalProps) {
  
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl sm:p-6">
        <h2 className="text-b-title-2 text-primary text-center">{title}</h2>

        {description && (
          <p className="mt-3 text-b-text-1 text-secondary text-center">
            {description}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <ActionButton
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {cancelText}
          </ActionButton>

          <ActionButton
            type="button"
            variant="danger"
            onClick={onConfirm}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? "УДАЛЕНИЕ..." : confirmText}
          </ActionButton>
        </div>
      </div>
    </div>
  );
}