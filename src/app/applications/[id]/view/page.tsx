"use client";

import Language from "@/components/language";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "@radix-ui/react-icons";
import { SelectContent, SelectItem } from "@radix-ui/react-select";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa6";
import { z } from "zod";

const createDeploymentSchema = z.object({
  name: z.string().min(3).max(14),
  version: z
    .string()
    .regex(
      /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/,
      "Invalid semver version"
    ),
});

export default function Application({ params }: { params: { id: string } }) {
  const [application, setApplication] = useState({});
  const [dialog, setDialog] = useState<boolean>(false);
  const form = useForm<z.infer<typeof createDeploymentSchema>>({
    resolver: zodResolver(createDeploymentSchema),
    defaultValues: {
      name: "",
      version: "",
    },
  });

  useEffect(() => {
    function fetchData() {
      fetch("/api/v1/applications/" + params.id)
        .then((response) => response.json())
        .then((data) => setApplication(data));
    }
    fetchData();
  }, []);

  function onSubmit(values: z.infer<typeof createDeploymentSchema>) {
    setDialog(false);
  }

  return (
    <main className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{application.name}</CardTitle>
          <CardDescription>{application.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row gap-4">
          <Card className="w-[180px]">
            <CardHeader className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Repository
            </CardHeader>
            <CardContent className="flex justify-center content-center">
              <Link
                target="_blank"
                href="https://github.com/platformoon/destroyer-server"
              >
                <FaGithub size={30} />
              </Link>
            </CardContent>
          </Card>

          <Card className="w-[180px]">
            <CardHeader className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Language
            </CardHeader>
            <CardContent className="flex justify-center content-center">
              <Language name={application.language} />
            </CardContent>
          </Card>

          <Card className="w-[180px]">
            <CardHeader className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Kind
            </CardHeader>
            <CardContent className="flex justify-center content-center font-light">
              {application.kind}
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Deployments</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <div className="flex flex-col gap-4">
            <p className="font-light">You do not have a deployment yet</p>
            <div className="flex py-4 w-full">
              <Dialog
                open={dialog}
                onOpenChange={(open) => {
                  setDialog(!dialog);
                  if (open) {
                    form.reset();
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button variant="default">
                    New <PlusIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>New Deployment</DialogTitle>
                    <DialogDescription>
                      Create a new deployment to run your application.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      id="create-deployment-form"
                      onSubmit={form.handleSubmit(onSubmit)}
                    >
                      <div className="grid gap-4 py-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  id="name"
                                  className="col-span-3"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                This is the application name
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        ></FormField>
                        <FormField
                          control={form.control}
                          name="version"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Version</FormLabel>
                              <FormControl>
                                <Input
                                  id="version"
                                  defaultValue="test"
                                  className="col-span-3"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                This is the application version
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        ></FormField>
                      </div>
                    </form>
                  </Form>

                  <DialogFooter>
                    <Button form="create-deployment-form" type="submit">
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
