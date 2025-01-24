import SmartTextInput from "@/app/lib/component/input/smart-textinput";
import { IconInfoCircle } from "@tabler/icons-react";

export default function SignIn() {
  return (
    <SmartTextInput
      label="Email"
      placeholder="Enter your email"
      contain="tooltip"
      tooltipLabel="test label"
      icon={<IconInfoCircle size={18} stroke={1.5} />}
      align="right"
    />
  );
}
