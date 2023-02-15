import { Header, Grid, Image } from "semantic-ui-react";
import Container from "../Container/Container";
import classrom from "../../img/classrom.jpg";

import "./BestCharacters.scss";

export default function BestCharacters() {
  return (
    <Container>
      <div className="best-characters">
        <Grid columns={2} divided="vertically">
          <Grid.Column>
            <Header as="h1">
              Software Educacion que permite el control Academico
            </Header>
            <Header as="h3">Disfruta del mejor contenido.</Header>
            
          </Grid.Column>
          <Grid.Column className="image-container">
            <Image src={classrom} alt="Marvel APP" />
          </Grid.Column>
        </Grid>
      </div>
    </Container>
  );
}
