"use client";

import Language from "@/components/language";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck, FaChevronDown, FaGithub, FaStore } from "react-icons/fa6";
import { z } from "zod";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";

const createDeploymentSchema = z.object({
  environment: z.string({
    required_error: "Please type a environment name"
  }).min(3).max(14),
  version: z.string({
    required_error: "Please select a version"
  }),
});

export default function Application({ params }: { params: { id: string } }) {
  const [application, setApplication] = useState({});
  const [versions, setVersions] = useState(["1.1.1", "1.0.1"]);
  const [showDeployForm, setShowDeployForm] = useState(false);
  const form = useForm<z.infer<typeof createDeploymentSchema>>({
    resolver: zodResolver(createDeploymentSchema),
    defaultValues: {
      environment: "",
      version: "",
    },
  });

  const { toast } = useToast();

  useEffect(() => {
    function fetchData() {
      fetch("/api/v1/applications/" + params.id)
        .then((response) => response.json())
        .then((data) => setApplication(data));
    }

    function fetchVersions() {
      fetch("/api/v1/applications/" + params.id + "/versions")
        .then((response) => response.json())
        .then((data) => setVersions(data));
    }
    fetchData();
  }, []);

  function onSubmit(values: z.infer<typeof createDeploymentSchema>) {
    fetch("/api/v1/deployments", {
      method: "POST",
      body: JSON.stringify({
        environment: values.environment,
        applicatonVersion: values.version,
        applicationName: application.name,
      }),
    }).then((response) => {
      if (response.status !== 202) {
        toast({
          title: "Deployment creation failed",
          description: "Your deployment could not be created",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Deployment created",
          description: "Your deployment has been created",
        });
      }
    });
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
                href={`https://github.com/platformoon/${application.name}`}
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
            <p hidden={showDeployForm} className="font-light">You do not have a deployment yet</p>
            <div className="flex py-4 w-full">
              <Collapsible>
                <CollapsibleContent>
                  <Form {...form}>
                    <form
                      id="create-deployment-form"
                      onSubmit={form.handleSubmit(onSubmit)}
                    >
                      <div className="grid gap-4">
                        <FormField
                          control={form.control}
                          name="environment"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Environemnt</FormLabel>
                              <FormControl>
                                <Input
                                  id="environment"
                                  className="col-span-3"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                This is the environment name
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        ></FormField>
                        <FormField
                          control={form.control}
                          name="version"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Version</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button variant="outline" role="combobox"
                                      className={cn(
                                        "justify-between",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {
                                        field.value ? versions.find((version) => version === field.value) : "Select the version"
                                      }
                                      <FaChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50"></FaChevronDown>
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent>
                                  <Command>
                                    <CommandInput placeholder="Search version..." />
                                    <CommandEmpty>No version found.</CommandEmpty>
                                    <CommandGroup>
                                      {versions.map((version) => (
                                        <CommandItem
                                          value={version}
                                          key={version}
                                          onSelect={() => {
                                            form.setValue("version", version)
                                          }}
                                        >
                                          <FaCheck
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              version === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          {version}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormDescription>
                                This is the application version
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        ></FormField>
                        <div className="flex flex-row gap-4">
                          <Button variant="default" size="default" type="submit">
                            Save <CheckIcon className="ml-2 h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="default" type="reset">
                            Cancel <Cross1Icon className="ml-2 h-4 w-4" />
                          </Button>
                        </div>

                      </div>

                    </form>
                  </Form>
                </CollapsibleContent>
                <CollapsibleTrigger hidden={showDeployForm} onClick={() => setShowDeployForm(!showDeployForm)} >
                  <Button variant="default">
                    New <PlusIcon className="ml-2 h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
