import { useState } from "react";
import { toast } from "sonner";
import { ActionButton } from "./ui/ActionButtons";
import { PasswordField, TextField } from "./ui/Fields";
import { Link } from "react-router-dom";
import { createUser } from "../api/users";
import AuthLayout from "./layout/AuthLayout";

export default function RegisterCard() {
  const [step, setStep] = useState<1 | 2>(1);

  const [email, setEmail] = useState("der@der.com");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("Дмитрий");
  const [password, setPassword] = useState("");

  function isValidEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v.trim());
  }

  function validateEmailStep(email: string, agree: boolean) {
    const e = email.trim();

    if (!e) return "Введи почту";
    if (!isValidEmail(e)) return "Неверный формат email";
    if (!agree) return "Подтверди согласие с политикой конфиденциальности";

    return null;
  }

  function validateRegisterStep(name: string, password: string) {
    const p = password;
    const n = name.trim();

    if (!p) return "Введи пароль";
    if (p.length < 6) return "Пароль должен содержать минимум 6 символов";
    if (/[А-Яа-яЁё]/.test(p)) return "Пароль должен содержать только латиницу";

    if (!n) return "Введи имя";
    if (n.length < 6) return "Имя должно содержать минимум 6 символов";
    

    return null;
  }


  function handleContinue() {
    const emailError = validateEmailStep(email, agree);
    if (emailError) return toast.error(emailError);

    toast.success("Почта подтверждена");
    setStep(2);
  }

  async function handleRegister() {
    const emailError = validateEmailStep(email, agree);
    if (emailError) return toast.error(emailError);

    const registerError = validateRegisterStep(name, password);

    if (registerError) return toast.error(registerError);

    try {
      setLoading(true);

      await createUser({
        email: email.trim(),
        name: name.trim(),
        password,
      });

      toast.success("Аккаунт создан!",);
    } catch (err: any) {
      if (err?.message === "HTTP 409") {
        toast.error("Пользователь с таким email уже существует",);
      } else {
        toast.error(err?.message || "Ошибка регистрации",);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Регистрация">
      <TextField
        label="Корпоративный e-mail"
        id="email"
        autoComplete="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Введи почту"
      />

      {step === 2 && (
        <>
          <PasswordField
            label="Пароль"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Придумай пароль"
          />

          <TextField
            label="Имя"
            autoComplete="name"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введи имя"
          />
        </>
      )}

      <label
        htmlFor="policy"
        className="mt-4 flex items-start gap-3 text-b-text-1 text-secondary"
      >
        <input
          id="policy"
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-blue-d"
        />
        <span>
          Я подтверждаю согласие с{" "}
          <Link to="/privacy" className="text-blue-d hover:underline">
            политикой конфиденциальности
          </Link>
        </span>
      </label>

      <ActionButton
        onClick={handleContinue}
        className={"mt-5" + (step === 2 ? " opacity-50" : "")}
        disabled={step === 2}
      >
        ПРОДОЛЖИТЬ
      </ActionButton>

      <ActionButton
        onClick={handleRegister}
        className="mt-3"
        variant="secondary"
        disabled={step === 1 || loading}
      >
        ВОЙТИ
      </ActionButton>

      <div className="mt-6 text-center text-b-text-2 text-secondary">
        <p>Возник вопрос или что-то сломалось?</p>
        <p className="mt-1">
          <Link
            to="/chat"
            className="text-blue-d underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-h/30 rounded-sm"
          >
            Вступай в чат и задавай вопрос
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}