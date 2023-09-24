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
import { useState } from "react";
import Language from "@/components/language";

export default function Applications() {
  const [applications, setApplications] = useState([]);

  fetch("/api/applications")
    .then((response) => response.json())
    .then((data) => setApplications(data));

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
                <TableHead>Kind</TableHead>
                <TableHead>Language</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app: any) => {
                return (
                  <TableRow key={app.id}>
                    <TableCell className="font-light">{app.name}</TableCell>
                    <TableCell className="font-light">
                      {app.description}
                    </TableCell>
                    <TableCell>
                      <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        {app.kind}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Language name={app.language} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
