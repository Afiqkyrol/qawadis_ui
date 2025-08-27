"use client";

import { Tabs } from "@mantine/core";

/**
 * SmartTab Component
 *
 * @param {Object} props
 * @param {Array} props.tabs - Array of tab objects [{ value, label, icon, content }]
 * @param {string} props.defaultValue - The default selected tab value
 * @param {string} props.orientation - Tab orientation ("horizontal" | "vertical")
 */
export default function SmartTab({
  tabs = [],
  defaultValue,
  orientation = "horizontal",
}) {
  return (
    <Tabs
      defaultValue={defaultValue ?? tabs[0]?.value}
      orientation={orientation}
    >
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Tab
            key={tab.value}
            value={tab.value}
            leftSection={tab.icon ?? null}
          >
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {tabs.map((tab) => (
        <Tabs.Panel key={tab.value} value={tab.value}>
          {tab.content}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
