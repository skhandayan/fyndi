import { Check, X } from "lucide-react";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="my-3 space-y-1">
      {criteria.map((item) => (
        <div
          key={item.label}
          className={`flex items-center text-[10px] py-1 transition-all duration-300 ${
            item.met
              ? "text-green-500"
              : "text-gray-400"
          }`}
        >
          {item.met ? (
            <Check className="size-3 mr-2 text-green-500" />
          ) : (
            <X className="size-3 mr-2 text-gray-400" />
          )}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const getGradient = (strength) => {
    if (strength <= 1) return "bg-gradient-to-r from-red-500 to-red-400";
    if (strength === 2) return "bg-gradient-to-r from-yellow-500 to-yellow-400";
    if (strength === 3) return "bg-gradient-to-r from-yellow-400 to-green-400";
    return "bg-gradient-to-r from-green-500 to-emerald-400";
  };

  const getStrengthText = (strength) => {
    switch (strength) {
      case 0:
        return { text: "Very Weak", color: "text-red-500" };
      case 1:
        return { text: "Weak", color: "text-red-400" };
      case 2:
        return { text: "Fair", color: "text-yellow-500" };
      case 3:
        return { text: "Good", color: "text-green-400" };
      default:
        return { text: "Strong", color: "text-green-500" };
    }
  };

  const { text, color } = getStrengthText(strength);

  return (
    <div className="mx-2">
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs py-2 text-gray-400">Password strength</span>
        <span className={`text-xs font-medium ${color}`}>
          {text}
        </span>
      </div>

      <div className="h-1 w-full rounded-full bg-gray-200/80 overflow-hidden mb-3">
        <div
          className={`h-full ${getGradient(strength)} rounded-full transition-all duration-500`}
          style={{ width: `${(strength / 4) * 100}%` }}
        />
      </div>

      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
