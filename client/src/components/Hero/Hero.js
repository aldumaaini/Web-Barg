import React from "react";
import "./HeroStyles.css";
import { useTranslation } from "react-i18next";
import LottieHero from "components/Lottie/LottieHero";
import { Container, Button } from 'reactstrap';
import { Link } from "react-router-dom";



const Hero = () => {
  const [t, i18n] = useTranslation();
  return (


    <div className="hero">
      <Container className=".container-md">
        <div className="content">
          <div className="col-1">
            <div className="title"> <span><strong>{t('WHATASAPP BARG..')}</strong> </span> </div>
            
            <h2>
              <b> {t('All in one click')}</b>
            </h2>
            <p> <strong>  {t("This solution is all what you really need to expand your business and target more people")}</strong></p>

            
            <div className="container-sm">
              <Button type="button" class="btn btn-secondary">
                <Link to="/register" >
                  {t('Start Now')}
                </Link>
              </Button>

            </div>
          </div>

          <div className="col-2">
            <LottieHero />
          </div>

        </div>

      </Container>

    </div>

  );
};

export default Hero;
