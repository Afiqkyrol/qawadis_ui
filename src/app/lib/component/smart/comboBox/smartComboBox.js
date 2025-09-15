import { useEffect, useState } from "react";
import { InputBase, Combobox, useCombobox, Badge } from "@mantine/core";
import { AppConstant } from "@/app/lib/constant/AppConstant";
import "./smartComboBox.css";

export default function SmartComboBox({
  controlName,
  label,
  options = [],
  value,
  onChange,
  required,
  readOnly,
  error,
  style,
  placeholder = "Select...",
  valueValidator,
  isStatus = false,
}) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [internalValue, setInternalValue] = useState(value || "");

  useEffect(() => {
    setInternalValue(value || "");
  }, [value]);

  const normalizedOptions = options.length
    ? [{ label: placeholder, value: "" }, ...options]
    : [{ label: placeholder, value: "" }];

  const optionElements = normalizedOptions.map((item, index) => (
    <Combobox.Option value={item.value} key={item.value || index}>
      {isStatus && index !== 0 ? (
        <Badge
          color={
            item.value === AppConstant.GSTS_ACTIVE
              ? "green"
              : item.value === AppConstant.GSTS_CLOSED
              ? "gray"
              : item.value === AppConstant.GSTS_INACTIVE
              ? "yellow"
              : "red"
          }
          radius="sm"
          variant="filled"
        >
          {item.label}
        </Badge>
      ) : (
        item.label
      )}
    </Combobox.Option>
  ));

  const handleChange = (val) => {
    setInternalValue(val);
    onChange && onChange({ controlName, value: val });
  };

  const selectedOption = normalizedOptions.find(
    (o) => o.value === internalValue
  );

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        handleChange(val);
        combobox.closeDropdown();
      }}
      disabled={readOnly}
    >
      <Combobox.Target>
        <InputBase
          label={label}
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          withAsterisk={required}
          onClick={() => !readOnly && combobox.toggleDropdown()}
          disabled={readOnly}
          error={error}
          onBlur={valueValidator}
          style={{
            minHeight: "80.2px",
            textAlign: "left",
            ...style,
          }}
        >
          {internalValue && selectedOption ? (
            isStatus ? (
              <Badge
                color={
                  selectedOption.value === AppConstant.GSTS_ACTIVE
                    ? "green"
                    : selectedOption.value === AppConstant.GSTS_CLOSED
                    ? "gray"
                    : selectedOption.value === AppConstant.GSTS_INACTIVE
                    ? "yellow"
                    : "red"
                }
                radius="sm"
                variant="filled"
              >
                {selectedOption.label}
              </Badge>
            ) : (
              selectedOption.label
            )
          ) : (
            placeholder
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{optionElements}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
