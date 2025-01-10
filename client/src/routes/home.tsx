import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-9/12 items-center py-20">
      <div className="w-full flex flex-col gap-y-20">
        <div className="w-full">
          <p className="font-serif font-bold text-6xl text-center p-5">
            Start your multilingual journey today—it's easy, engaging, and
              effective!
          </p>
        </div>
        <Separator/>
        <div className="w-full min-h-[200px] flex justify-center items-center gap-x-20 p-5">
          <img
            src={"/learn.jpg"}
            alt="Learn languages"
            className="w-1/2 border rounded-2xl shadow-lg min-h-[300px]"
          />
          <div className="w-1/2 flex flex-col items-start gap-y-5">
            <p className="font-serif font-bold text-5xl text-start">
              Learn multiple languages
            </p>
            <div>
              <p className="text-2xl text-start">
                Master English, German, French, Spanish, and Norwegian—all in
                one app!
              </p>
            </div>
            <Button onClick={() => navigate("/learn")}>Learn</Button>
          </div>
        </div>
        <div className="w-full min-h-[200px] flex justify-center items-center gap-x-20 p-5">
          <div className="w-1/2 flex flex-col items-start gap-y-5">
            <p className="font-serif font-bold text-5xl text-start">
              Interactive learning
            </p>
            <div>
              <p className="text-2xl text-start">
                Learn languages at your own pace with interactive lessons and
                fun challenges.
              </p>
            </div>
            <Button onClick={() => navigate("/learn")}>Learn</Button>
          </div>
          <img
            src={""}
            alt="Interactive learning"
            className="w-1/2 border rounded-2xl shadow-lg min-h-[300px]"
          />
        </div>
        <div className="w-full min-h-[200px] flex justify-center items-center gap-x-20 p-5">
          <img
            src={""}
            alt="Realistic conversations"
            className="w-1/2 border rounded-2xl shadow-lg min-h-[300px]"
          />
          <div className="w-1/2 flex flex-col items-start gap-y-5">
            <p className="font-serif font-bold text-5xl text-start">
              Realistic conversations
            </p>
            <div>
              <p className="text-2xl text-start">
                Speak confidently: Practice real-world conversations anytime,
                anywhere.
              </p>
            </div>
            <Button onClick={() => navigate("/learn")}>Learn</Button>
          </div>
        </div>
        <div className="w-full min-h-[200px] flex justify-center items-center gap-x-20 p-5">
          <div className="w-1/2 flex flex-col items-start gap-y-5">
            <p className="font-serif font-bold text-5xl text-start">
              For everyone!
            </p>
            <div>
              <p className="text-2xl text-start">
                From beginners to advanced learners, we've got you covered!
              </p>
            </div>
            <Button onClick={() => navigate("/learn")}>Learn</Button>
          </div>
          <img
            src={""}
            alt="For everyone"
            className="w-1/2 border rounded-2xl shadow-lg min-h-[300px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
