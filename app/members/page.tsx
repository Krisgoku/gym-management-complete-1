"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/members/data-table";
import { columns } from "@/components/members/columns";
import { AddMemberDialog } from "@/components/members/add-member-dialog";

export default function MembersPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Members</h1>
          <p className="text-sm text-muted-foreground">
            Manage your fitness centre members here
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>
      <DataTable columns={columns} />
      <AddMemberDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}