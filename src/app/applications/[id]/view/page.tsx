"use client";

import { useState } from "react";

export default function Application({ params }: { params: { id: string } }) {
  const [application, setApplication] = useState({});

  fetch("/api/v1/applications/" + params.id)
    .then((response) => response.json())
    .then((data) => setApplication(data));

  return <h1>{JSON.stringify(application)}</h1>;
}
