import React from 'react'
import { useLocation } from "react-router-dom";

export default function StudentInfo() {

  const {state}=useLocation()
  const stdrgn = state.regno
  const stdcrs = state.course


  return (
    <div>
      <div>
      <p><b>Name: </b>{state.name}</p>
      <p><b>Register Number: </b>{stdrgn}</p>
      </div>
      <div>
        <p><b>Course: </b></p>
      </div>
    </div>
  )
}
