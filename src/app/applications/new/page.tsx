"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, RocketIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
const formSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(3).max(200),
});

export default function Applications() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Application created",
      description: "Your application was created successfully",
    });
  }

  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="flex w-[100px]">
        <Link href="/applications">
          <Button variant="link" className="p-0">
            <ArrowLeftIcon className="mr-2 h-8 w-8" />
          </Button>
        </Link>
      </div>

      <Card className="w-[400px]">
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application name</FormLabel>
                    <FormControl>
                      <Input placeholder="my-app-name" type="text" {...field} />
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="This application does..."
                        inputMode="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the application description
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <div className="flex justify-end">
                <Button type="submit">
                  <RocketIcon className="mr-2 h-4 w-4" />
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
