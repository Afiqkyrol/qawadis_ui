"use client";

import { Tabs, Skeleton } from "@mantine/core";

/**
 * SmartTab Component
 *
 * @param {Object} props
 * @param {Array} props.tabs - Array of tab objects [{ value, label, icon, content }]
 * @param {string} props.defaultValue - The default selected tab value
 * @param {string} props.orientation - Tab orientation ("horizontal" | "vertical")
 * @param {boolean} props.isLoading - Show skeletons instead of labels when true
 */
export default function SmartTab({
  tabs = [],
  defaultValue,
  orientation = "horizontal",
  isLoading = false,
}) {
  return (
    <Tabs
      defaultValue={defaultValue ?? tabs[0]?.value}
      orientation={orientation}
    >
      <Tabs.List style={{ marginBottom: "1rem" }}>
        {tabs.map((tab) => (
          <Tabs.Tab
            key={tab.value}
            value={tab.value}
            leftSection={tab.icon ?? null}
          >
            {isLoading ? (
              <Skeleton height={20} width={60} radius="sm" />
            ) : (
              tab.label
            )}
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
