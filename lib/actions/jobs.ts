import { IjobFromData } from "@/app/dashboard/recruiter/jobs/addjob/page"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://LocaLhost:8000"

export const createJob = async (data: IjobFromData) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data) ,
  })
  return res.json()
}
