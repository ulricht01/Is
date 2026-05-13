"use client"

import Post from "@/components/MainPage/Post";
import Filter from "@/components/MainPage/Filter";
import Title from "@/components/MainPage/Title";
import Container from "@/components/PagesStructure/Container";
import categoryOptions from "../js/categoryOptions";
import AddButton from "@/components/AddPost/AddButton";
import { useState } from "react";
 

export default function Home() {
  const activeUser = {
    name: "Tomáš",
    admin: true
  }

  const [posts, setPosts] = useState([
    {
      id: 1,
      jmeno: "Tomáš Ulrich",
      category: "Informativní",
      time: "13.05.2026 18:14",
      title: "Lorem Ipsum Nadpisum",
      message: "Lorem ipsum maximum nesmylnum kopium bombium tamtum randum tatom random atom msae kao teprvksa ksdakd"
    },
    {
      id: 2,
      jmeno: "Tomáš Ulrich",
      category: "Informativní",
      time: "11.05.2026 18:14",
      title: "Lorem Ipsum Nadpisum",
      message: "Lorem ipsum maximum nesmylnum kopium bombium tamtum randum tatom random atom msae kao teprvksa ksdakd"
    },
    {
      id: 3,
      jmeno: "Tomáš Ulrich",
      category: "Informativní",
      time: "10.05.2026 18:14",
      title: "Lorem Ipsum Nadpisum",
      message: "Lorem ipsum maximum nesmylnum kopium bombium tamtum randum tatom random atom msae kao teprvksa ksdakd"
    }
  ])

  const [selectedCategory, setSelectedCategory] = useState("Kategorie")
  const [selectedDate, setSelectedDate] = useState("Datum")

  const filteredData = posts.filter((post) => {
    const matchesCategory = selectedCategory === "Kategorie" || post.category === selectedCategory;
  
    let matchesDate = true;
    
    if (selectedDate instanceof Date) {
      
      // Rozložíme string "13.05.2026 18:14" na části
      const [datePart, timePart] = post.time.split(' ');
      const [day, month, year] = datePart.split('.').map(Number);
      
      const [hour, minute] = timePart;
  
      // (měsíce jsou v JS od 0, proto month - 1)
      const postDateObj = new Date(year, month - 1, day, hour, minute);
  
      
      matchesDate = postDateObj >= selectedDate;
    }
  
    // Pokud má příspěvek stejný nebo pozdější datum a zároveň se matchne kategorie, tak je posunut do listu
    return matchesCategory && matchesDate;
  });
  

  const addPost = (newPostData) => {
    const now = new Date();
    const d = String(now.getDate()).padStart(2, '0');
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const y = now.getFullYear();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const formattedDate = `${d}.${m}.${y} ${time}`;


    const newPost = {
      id: now.getTime(),
      jmeno: activeUser.name,
      category: newPostData.category,
      time: formattedDate,
      title: newPostData.title,
      message: newPostData.post
    }
    setPosts([newPost, ...posts])
  }
  
  return (
    <Container title="Školní informační systém">
        <Title 
          title="Nejnovější příspěvky" 
          description="Nejnovější příspevky se zobrazují jako první">
        </Title>
        <div className="flex gap-3">
          <Filter filterArray={categoryOptions} text="Kategorie" type="category" onFilterChange={(val)=> setSelectedCategory(val)}></Filter>
          <Filter filterArray={categoryOptions} text="Datum" type="date" onFilterChange={(val)=>setSelectedDate(val)}></Filter>
        </div>
        {activeUser.admin && (
        <AddButton onAddPost={addPost}></AddButton>
        )}
        {
          filteredData.map((post) => (
            <Post 
              key={post.id} 
              name={post.jmeno} 
              category={post.category} 
              time={post.time} 
              title={post.title}
              message={post.message}></Post>
          ))
        }
    </Container>
  );
}
