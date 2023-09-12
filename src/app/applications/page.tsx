"use client";

import { Button } from "@/components/ui/button";
import { RocketIcon } from "@radix-ui/react-icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaGolang } from "react-icons/fa6";
import Link from "next/link";

export default function Applications() {
  return (
    <div className="flex flex-col p-4 gap-4">
      <Tabs defaultValue="applications">
        <TabsList>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>
        <TabsContent value="applications">
          <div className="flex py-4 w-full justify-end">
            <Link href="/applications/new">
              <Button variant="default">
                New application <RocketIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <Table>
            <TableCaption>A list of your applications.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Technology</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-light">platformoon-apps</TableCell>
                <TableCell className="font-light">
                  A GoLang API responsible for managing Platformoon`s apps
                </TableCell>
                <TableCell>
                  <FaGolang size={30} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
