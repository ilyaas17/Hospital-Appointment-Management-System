import React from 'react'
import { useSelector } from 'react-redux'
export default function HospitalDashboard() {
  console.log(useSelector((s)=>s.hospitalInfo))
  return (
    <div>
      HospitalDashboard</div>
  )
}
