import { getJobs } from "@/lib/api/jobs"


export default async function BrowseJobPage({searchParams} : {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
     const  search = await searchParams
     const urlSeach = new URLSearchParams(search as Record<string, string>)
     const query = urlSeach.toString()
     const jobsData = await getJobs(query)
     

    //  const jobType = 'Full-time'
    //  const jobCategory = 'Engineering & Tech'
    //  const res= await fetch(`http://localhost:8000/jobs?jobType=${encodeURIComponent(jobType)}&jobCategory=${encodeURIComponent(jobCategory)}`)
    //  console.log(query);
     
  return (
    <div>BrowseJobPage</div>
  )
}
