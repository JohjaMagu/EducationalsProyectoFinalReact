import { Grid, Header, Image } from "semantic-ui-react";
import rom from "../../img/rom.jpg";
import "./Insider.scss";

export default function Insider() {
  return (
    <div className="container-insider">
      <Grid container columns="2">
        <Grid.Column>
          <Image src={rom} alt="Image Insider" />
        </Grid.Column>
        <Grid.Column>
          <Header size="large" color="red" as="h1">
            Software Education
          </Header>
          
          
        </Grid.Column>
      </Grid>
    </div>
  );
}
