import Card, { CardImage, CardText } from "../../components/Card";
import PressReleases from "../../components/PressReleases";

function About() {
  return (
    <>
      <div className="relative flex flex-col border border-accent/10 lg:text-left">
        <picture>
          <source
            media="(min-width: 1440px)"
            srcSet="../images/illustrations/about-illustration-desktop.png"
            type="image/png"
          />
          <source
            media="(min-width: 768px)"
            srcSet="../images/illustrations/about-illustration-laptop.png"
            type="image/png"
          />
          <img
            className="aspect-4/3 w-screen object-cover md:max-h-[500px]"
            src="../images/illustrations/about-illustration-mobile.png"
            alt="shot of a sunflower and a bright sky"
          />
        </picture>
        <div className="bottom-0 left-0 flex flex-col gap-4 bg-background p-8 md:absolute xl:max-w-[85ch]">
          <h1 className="text-3xl font-medium lg:text-5xl">
            Building a simpler, brighter financial journey for you.
          </h1>
          <p>
            At CielTrust, we believe in removing barriers to financial success,
            offering tools and support that make banking easy and rewarding so
            you can focus on what matters most.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-16 lg:items-start lg:text-left">
        <div className="flex flex-col gap-8 lg:flex-row lg:text-left">
          <h1 className="basis-1/2 text-3xl font-medium lg:text-5xl">
            <span className="text-brand">Mission & Vision</span>
          </h1>
          <p className="basis-1/2">
            We envision being a leading force in the industry, driven by
            innovation, integrity, and inclusivity, creating a brighter
            financial future for individuals and businesses while maintaining a
            strong commitment to customer satisfaction and community development
          </p>
        </div>
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2">
          <Card>
            <CardImage
              imgPath="about-mission-illustration"
              imgFormat="png"
              imgAlt="two women looking at mobile phone smiling"
            />

            <CardText title="Effortless banking, lasting rewards">
              <p>
                We’re here to make managing your finances effortless and
                rewarding, transforming banking into a reliable and supportive
                experience that fits seamlessly into your life
              </p>
            </CardText>
          </Card>

          <Card>
            <CardImage
              imgPath="about-vision-illustration"
              imgFormat="png"
              imgAlt="group of people having a meeting in the office"
            />

            <CardText title="Simplifying banking, inspiring confidence">
              <p>
                We see a world where banking is simple, supportive, and
                accessible to all, inspiring confidence and guiding every client
                on their unique path to financial success
              </p>
            </CardText>
          </Card>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 lg:items-start">
        <PressReleases />
      </div>
    </>
  );
}

export default About;
