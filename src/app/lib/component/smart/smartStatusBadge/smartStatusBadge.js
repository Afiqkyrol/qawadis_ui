import { AppConstant } from "@/app/lib/constant/AppConstant";
import { Badge } from "@mantine/core";

export default function SmartStatusBadge({
  value,
  cursor = "default",
  variant = "filled",
  color = "gray",
}) {
  let status;

  if (
    value == AppConstant.GSTS_ACTIVE ||
    value == AppConstant.GSTS_ACTIVE_DESC
  ) {
    status = "ACTIVE";
    color = "green";
  } else if (
    value == AppConstant.GSTS_CLOSED ||
    value == AppConstant.GSTS_CLOSED_DESC
  ) {
    status = "CLOSED";
    color = "gray";
  } else if (
    value == AppConstant.GSTS_INACTIVE ||
    value == AppConstant.GSTS_INACTIVE_DESC
  ) {
    status = "INACTIVE";
    color = "orange";
  } else if (
    value == AppConstant.GSTS_CANCELED ||
    value == AppConstant.GSTS_CANCELED_DESC
  ) {
    status = "CANCELED";
    color = "red";
  } else {
    status = value;
    color = color;
  }

  return (
    <Badge style={{ cursor }} color={color} radius="sm" variant={variant}>
      {status}
    </Badge>
  );
}
