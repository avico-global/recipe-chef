import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'    
import Top10List from '@/components/Top10List'

export default function top10recipes() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <Top10List />
      </div>
      <Footer />
    </div>
  );
}
