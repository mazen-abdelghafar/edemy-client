import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SyncOutlined } from "@ant-design/icons";
import UserNav from "../nav/UserNav";

const UserRoute = ({ children, showNav = true }) => {
  // state
  const [ok, setOk] = useState(false);

  // router
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/login");
    }
  };

  return (
    <>
      {!ok ? (
        <div className="w-25 h-25 mt-5 pt-5 mx-auto text-center">
          <SyncOutlined spin className="display-4 text-primary" />
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">{showNav && <UserNav />}</div>
            <div className="col-md-10">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserRoute;
