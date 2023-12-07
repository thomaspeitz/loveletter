import { Button, Link } from "@mui/material";
import * as React from "react";
import ListLovepoints from "../components/ListLovepoints";

const Home: React.FC = () => {
  return (
    <>
      <Button>
        <Link href="/loveletter/new">Add new lovepoint</Link>
      </Button>
      <Button>
        <Link href="/loveletter/search">Search lovepoint</Link>
      </Button>
      <h1>
        Lovepoints
        <br></br>
        <ListLovepoints />
      </h1>
    </>
  );
};

export default Home;
