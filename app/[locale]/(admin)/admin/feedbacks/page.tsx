import { TableColumn } from "@/types/blocks/table";
import TableSlot from "@/components/dashboard/slots/table";
import { Table as TableSlotType } from "@/types/slots/table";
import { getFeedbacks } from "@/models/feedback";
import moment from "moment";
import Image from "next/image";

// Removed edge runtime to avoid 1MB size limit
// export const runtime = "edge";

export default async function () {
  const feedbacks = await getFeedbacks(1, 50);

  const columns: TableColumn[] = [
    {
      title: "User",
      name: "user",
      callback: (row) => {
        if (!row.user || !row.user.avatar_url) {
          return "-";
        }

        return (
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={row.user?.avatar_url || "/images/placeholder.jpg"}
                alt={`${row.user?.nickname || '用户'} 头像`}
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <span>{row.user?.nickname}</span>
          </div>
        );
      },
    },
    {
      name: "content",
      title: "Content",
      callback: (row) => row.content,
    },
    {
      name: "rating",
      title: "Rating",
      callback: (row) => row.rating,
    },
    {
      name: "created_at",
      title: "Created At",
      callback: (row) => moment(row.created_at).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      name: "actions",
      title: "Actions",
      callback: (row) => (
        <a href={`/admin/users?user_uuid=${row.user_uuid}`} target="_blank">
          View user
        </a>
      ),
    },
  ];

  const table: TableSlotType = {
    title: "Feedbacks",
    columns,
    data: feedbacks,
  };

  return <TableSlot {...table} />;
}
