import Post from "@/components/MainPage/Post";
import Filter from "@/components/MainPage/Filter";
import Title from "@/components/MainPage/Title";
import Container from "@/components/PagesStructure/Container";
import categoryOptions from "../js/categoryOptions";
 

export default function Home() {
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
        <Post name="Tomáš Ulrich" category="Informativní" time="20:30" message="Lorem ipsum maximum nesmylnum kopium bombium tamtum randum tatom random atom msae kao teprvksa ksdakd"></Post>
        <Post name="Tomáš Ulrich" category="Informativní" time="20:30" message="Lorem ipsum maximum nesmylnum kopium bombium tamtum randum tatom random atom msae kao teprvksa ksdakd"></Post>
        <Post name="Tomáš Ulrich" category="Informativní" time="20:30" message="Lorem ipsum maximum nesmylnum kopium bombium tamtum randum tatom random atom msae kao teprvksa ksdakd"></Post>
        <Post name="Tomáš Ulrich" category="Informativní" time="20:30" message="Lorem ipsum maximum nesmylnum kopium bombium tamtum randum tatom random atom msae kao teprvksa ksdakd"></Post>
    </Container>
  );
}
