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
      jmeno: "Tomáš Ulrich",
      category: "Informativní",
      time: "20:30",
      message: "Lorem ipsum maximum nesmylnum kopium bombium tamtum randum tatom random atom msae kao teprvksa ksdakd"
    },
    {
      jmeno: "Tomáš Ulrich",
      category: "Informativní",
      time: "20:30",
      message: "Lorem ipsum maximum nesmylnum kopium bombium tamtum randum tatom random atom msae kao teprvksa ksdakd"
    },
    {
      jmeno: "Tomáš Ulrich",
      category: "Informativní",
      time: "20:30",
      message: "Lorem ipsum maximum nesmylnum kopium bombium tamtum randum tatom random atom msae kao teprvksa ksdakd"
    }
  ])

  const addPost = (newPostData) => {
    const newPost = {
      jmeno: activeUser.name,
      category: newPostData.category,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"}),
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
          <Filter filterArray={categoryOptions} text="Kategorie" type="category"></Filter>
          <Filter filterArray={categoryOptions} text="Datum" type="date"></Filter>
        </div>
        {activeUser.admin && (
        <AddButton onAddPost={addPost}></AddButton>
        )}
        {
          posts.map((post, index) => (
            <Post key={index} name={post.jmeno} category={post.category} time={post.time} message={post.message}></Post>
          ))
        }
        <Post name="Tomáš Ulrich" category="Informativní" time="20:30" message="Lorem ipsum maximum nesmylnum kopium bombium tamtum randum tatom random atom msae kao teprvksa ksdakd"></Post>
    </Container>
  );
}
