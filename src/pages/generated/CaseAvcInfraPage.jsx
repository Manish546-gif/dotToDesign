import { usePageRuntime } from '../pageRuntime.js';
import Footer from '../../components/Footer.jsx';

export default function CaseAvcInfraPage() {
  const rootRef = usePageRuntime('case-study');

  return (
    <div ref={rootRef}>
      <div>
        <a className="skip-link" href="#main">Skip to content</a>
        <div className="curtain" aria-hidden="true">
          <div className="curtain__mark"><svg aria-hidden="true" focusable="false" viewBox="0 0 433 282" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M188.399 281.71H0V244.385H188.399V281.71Z" fill="currentColor" />
              <path fillRule="evenodd" clipRule="evenodd" d="M188.399 131.524H188.396C188.397 131.672 188.399 131.82 188.399 131.968C188.399 184.238 146.224 226.612 94.1995 226.612C42.1746 226.612 0 184.238 0 131.968C0 79.6979 42.1746 37.3244 94.1995 37.3244C115.566 37.3244 135.271 44.4729 151.075 56.5177V0H188.399V131.524ZM94.1995 74.6487C62.7883 74.6487 37.3243 100.312 37.3243 131.968C37.3243 163.625 62.7883 189.288 94.1995 189.288C125.611 189.288 151.075 163.625 151.075 131.968C151.075 100.312 125.611 74.6487 94.1995 74.6487Z" fill="currentColor" />
              <path d="M319.479 0C382.056 0 432.785 50.7289 432.785 113.306C432.785 175.141 383.252 225.404 321.701 226.588V226.612H261.271V189.253H321.701C362.637 188.077 395.461 154.526 395.461 113.306C395.461 71.3426 361.575 37.6014 319.612 37.6014C277.649 37.6014 244.041 71.3426 244.041 113.306C244.041 115.083 244.041 118.194 244.041 118.194V226.612H206.173V112.862H206.176C206.415 50.4889 257.049 0 319.479 0Z" fill="currentColor" />
            </svg>
          </div>
          <p className="curtain__label t-mono-label">Engineered identities</p>
          <p className="curtain__count t-mono-label"><span>000</span></p>
        </div>
        <div className="cursor" aria-hidden="true">
          <div className="cursor__line cursor__line--h" />
          <div className="cursor__line cursor__line--v" />
          <div className="cursor__dot" />
          <div className="cursor__label">View</div>
          <div className="cursor__media"><img alt="" src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" /></div>
        </div>
        <header className="header">
          <a className="logo" href="/" aria-label="DotToDesign â€” home"><svg role="img" aria-hidden="true" focusable="false" viewBox="0 0 835 133" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="logo__mark" d="M88.8799 132.9H0V115.293H88.8799V132.9Z" fill="currentColor" />
              <path className="logo__mark" fillRule="evenodd" clipRule="evenodd" d="M88.8799 62.0488C88.8803 62.1186 88.8799 62.188 88.8799 62.2578C88.8799 86.9168 68.9837 106.908 44.4404 106.908C19.8969 106.908 0 86.917 0 62.2578C0.000176491 37.5987 19.897 17.6084 44.4404 17.6084C54.5201 17.6085 63.8158 20.9809 71.2715 26.6631V0H88.8799V62.0488ZM44.4404 35.2168C29.6218 35.2168 17.6086 47.3236 17.6084 62.2578C17.6084 77.1922 29.6217 89.2998 44.4404 89.2998C59.2589 89.2996 71.2715 77.192 71.2715 62.2578C71.2713 47.3238 59.2588 35.217 44.4404 35.2168Z" fill="currentColor" />
              <path className="logo__mark" d="M150.719 0C180.24 0.000124302 204.172 23.9325 204.172 53.4541C204.172 82.6255 180.804 106.338 151.767 106.896V106.907H123.258V89.2832H151.767C171.079 88.7285 186.564 72.9003 186.564 53.4541C186.564 33.6573 170.515 17.6085 150.719 17.6084C130.922 17.6084 114.873 33.6572 114.873 53.4541V106.907H97.2646V53.2441C97.3775 23.8189 121.267 0 150.719 0Z" fill="currentColor" />
              <path fillRule="evenodd" clipRule="evenodd" d="M334.971 33.2129C341.132 33.213 346.733 34.6442 351.773 37.5068C356.876 40.3695 360.891 44.3522 363.815 49.4551C366.803 54.4959 368.296 60.1904 368.296 66.5381C368.296 72.9479 366.802 78.7046 363.815 83.8076C360.891 88.8484 356.876 92.8004 351.773 95.6631C346.671 98.5257 341.069 99.957 334.971 99.957C328.872 99.957 323.271 98.5256 318.168 95.6631C313.065 92.8004 309.019 88.8484 306.032 83.8076C303.045 78.7046 301.552 72.948 301.552 66.5381C301.552 60.1904 303.045 54.4959 306.032 49.4551C309.019 44.3521 313.065 40.3695 318.168 37.5068C323.271 34.6443 328.872 33.2129 334.971 33.2129ZM334.971 44.9746C331.05 44.9746 327.565 45.8464 324.516 47.5889C321.528 49.3314 319.194 51.8511 317.514 55.1494C315.833 58.3855 314.994 62.1819 314.994 66.5381C314.994 70.8943 315.833 74.7222 317.514 78.0205C319.194 81.3187 321.529 83.8701 324.516 85.6748C327.565 87.4172 331.05 88.2881 334.971 88.2881C338.891 88.288 342.345 87.4172 345.332 85.6748C348.319 83.8701 350.653 81.3186 352.333 78.0205C354.013 74.7222 354.854 70.8943 354.854 66.5381C354.854 62.1819 354.013 58.3855 352.333 55.1494C350.653 51.8513 348.319 49.3313 345.332 47.5889C342.345 45.8464 338.891 44.9747 334.971 44.9746Z" fill="currentColor" />
              <path d="M416.896 44.1777H394.012L399.256 47.5146V99.957H385.907V44.1777H368.268V33.2129H416.896V44.1777Z" fill="currentColor" />
              <path d="M448.008 46.5029H458.753V55.5254H443.466L448.011 58.0859L448.008 85.1143C448.008 87.119 448.469 88.5741 449.39 89.4795C450.377 90.3203 452.021 90.7412 454.324 90.7412H461.232V99.957H452.351C447.285 99.957 443.403 98.793 440.705 96.4648C438.008 94.1366 436.659 90.3528 436.659 85.1143V55.5254H430.244V46.5029H436.659V33.2129H448.008V46.5029Z" fill="currentColor" />
              <path fillRule="evenodd" clipRule="evenodd" d="M485.785 53.2363C490.119 53.2363 494.041 54.1935 497.552 56.1094C501.062 58.0252 503.833 60.7624 505.862 64.3203C507.892 67.8784 508.907 71.9575 508.907 76.5557C508.907 81.1537 507.865 85.232 505.78 88.79C503.696 92.348 500.843 95.1124 497.223 97.083C493.657 98.9988 489.708 99.957 485.374 99.957C481.095 99.957 477.227 98.9989 473.771 97.083C470.316 95.1124 467.6 92.3754 465.625 88.8721C463.65 85.314 462.663 81.2084 462.663 76.5557C462.663 71.9575 463.677 67.8784 465.707 64.3203C467.737 60.7623 470.508 58.0253 474.019 56.1094C477.529 54.1936 481.452 53.2363 485.785 53.2363ZM485.62 61.3652C483.207 61.3653 480.957 61.9394 478.873 63.0889C476.843 64.2383 475.225 65.9628 474.019 68.2617C472.812 70.5061 472.208 73.2712 472.208 76.5557C472.208 81.4274 473.443 85.2045 475.911 87.8867C478.435 90.5141 481.589 91.8281 485.374 91.8281C487.788 91.8281 490.037 91.253 492.121 90.1035C494.26 88.954 495.988 87.2296 497.305 84.9307C498.621 82.6317 499.28 79.8399 499.28 76.5557C499.28 73.2712 498.649 70.5061 497.388 68.2617C496.126 65.9627 494.453 64.2384 492.368 63.0889C490.284 61.9393 488.034 61.3652 485.62 61.3652Z" fill="currentColor" />
              <path d="M654.68 33.2129C661.399 33.2129 666.842 34.8619 671.011 38.1602C675.241 41.3962 677.574 45.9393 678.01 51.7891H663.639C663.514 49.5487 662.549 47.7126 660.745 46.2812C659.003 44.7879 656.67 44.041 653.746 44.041C651.196 44.0411 649.142 44.6951 647.587 46.002C646.094 47.3087 645.348 49.2065 645.348 51.6953C645.348 53.4378 645.908 54.9006 647.027 56.083C648.209 57.2032 649.641 58.137 651.32 58.8838C653.062 59.5683 655.489 60.3771 658.6 61.3105C662.83 62.5552 666.283 63.8003 668.958 65.0449C671.633 66.2896 673.935 68.1564 675.863 70.6455C677.792 73.1348 678.757 76.4022 678.757 80.4473C678.757 83.9322 677.854 87.1682 676.05 90.1553C674.246 93.1423 671.602 95.5381 668.118 97.3428C664.634 99.0853 660.497 99.957 655.706 99.957C651.165 99.957 647.058 99.1788 643.388 97.623C639.78 96.0673 636.918 93.8271 634.803 90.9023C632.688 87.9774 631.598 84.5229 631.536 80.54H645.534C645.721 83.2159 646.654 85.3319 648.334 86.8877C650.076 88.4435 652.44 89.2217 655.427 89.2217C658.475 89.2216 660.87 88.5065 662.612 87.0752C664.354 85.5816 665.225 83.6519 665.225 81.2871C665.225 79.358 664.634 77.771 663.452 76.5264C662.27 75.2818 660.777 74.3174 658.973 73.6328C657.231 72.886 654.804 72.0773 651.693 71.2061C647.463 69.9614 644.01 68.7478 641.335 67.5654C638.722 66.3208 636.451 64.4846 634.522 62.0576C632.656 59.5683 631.723 56.2694 631.723 52.1621C631.723 48.3039 632.688 44.9436 634.616 42.0811C636.545 39.2185 639.251 37.0404 642.734 35.5469C646.218 33.9911 650.2 33.2129 654.68 33.2129Z" fill="currentColor" />
              <path d="M740.506 33.2129C747.847 33.2129 754.224 35.0175 759.637 38.627C765.049 42.1742 768.782 47.1841 770.835 53.6562H755.811C754.317 50.918 752.264 48.8327 749.651 47.4014C747.038 45.9701 743.99 45.2549 740.506 45.2549C736.649 45.2549 733.227 46.1259 730.241 47.8682C727.255 49.6106 724.922 52.1001 723.242 55.3359C721.562 58.572 720.723 62.3063 720.723 66.5381C720.723 70.8943 721.562 74.6907 723.242 77.9268C724.984 81.1628 727.379 83.6521 730.428 85.3945C733.476 87.137 737.023 88.0088 741.066 88.0088C746.043 88.0087 750.118 86.7015 753.291 84.0879C756.464 81.412 758.548 77.709 759.543 72.9795H737.146V62.9912H772.422V74.3799C771.551 78.9227 769.684 83.1231 766.822 86.9814C763.961 90.8397 760.259 93.9516 755.718 96.3164C751.238 98.619 746.199 99.7705 740.6 99.7705C734.316 99.7705 728.623 98.3698 723.521 95.5693C718.482 92.7067 714.501 88.7546 711.577 83.7139C708.715 78.6731 707.284 72.9479 707.284 66.5381C707.284 60.1282 708.715 54.4031 711.577 49.3623C714.501 44.2593 718.482 40.3073 723.521 37.5068C728.623 34.6442 734.285 33.2129 740.506 33.2129Z" fill="currentColor" />
              <path fillRule="evenodd" clipRule="evenodd" d="M260.428 33.2129C267.42 33.2129 273.554 34.5792 278.83 37.3125C284.17 40.0458 288.269 43.9557 291.13 49.041C294.054 54.0627 295.516 59.9106 295.516 66.585C295.516 73.2593 294.054 79.1072 291.13 84.1289C288.269 89.087 284.17 92.9327 278.83 95.666C273.554 98.3993 267.42 99.7666 260.428 99.7666H237.163V33.2129H260.428ZM250.512 88.4199H259.951C266.943 88.4199 272.346 86.513 276.16 82.6992C279.974 78.8853 281.881 73.5136 281.881 66.585C281.881 59.6564 279.974 54.2535 276.16 50.376C272.346 46.4349 266.943 44.4639 259.951 44.4639H250.512V88.4199Z" fill="currentColor" />
              <path d="M821.935 78.9736V34.166H835V99.417H821.935L792.353 54.7031V99.417H779.288V34.166H792.353L821.935 78.9736Z" fill="currentColor" />
              <path fillRule="evenodd" clipRule="evenodd" d="M545.026 34.166C551.87 34.166 557.873 35.5047 563.037 38.1807C568.263 40.8566 572.276 44.6836 575.075 49.6621C577.937 54.5784 579.368 60.3036 579.368 66.8379C579.368 73.3723 577.937 79.0983 575.075 84.0146C572.276 88.8686 568.263 92.6336 563.037 95.3096C557.873 97.9855 551.87 99.3232 545.026 99.3232H522.256V34.166H545.026ZM535.321 88.2148H544.56C551.403 88.2148 556.691 86.348 560.424 82.6143C564.157 78.8803 566.023 73.6212 566.023 66.8379C566.023 60.0547 564.157 54.7649 560.424 50.9688C556.691 47.1106 551.403 45.1816 544.56 45.1816H535.321V88.2148Z" fill="currentColor" />
              <path d="M700.349 99.3232H687.283V34.166H700.349V99.3232Z" fill="currentColor" />
              <path d="M623.868 44.7402H594.854L599.225 47.3066V60.9727H621.078V71.2695H599.225V88.4287H623.868V99.0039H586.206V34.166H623.868V44.7402Z" fill="currentColor" />
            </svg>
          </a>
          <nav className="nav" aria-label="Primary">
            <a className="nav-link" data-nav="work" href="/work">Work</a>
            <a className="nav-link" data-nav="studio" href="/studio">Studio</a>
            <a className="nav-link" data-nav="services" href="/services">Services</a>
            <a className="nav-link" data-nav="journal" href="/journal">Journal</a>
          </nav>
          <div className="header__right">
            <button className="theme-toggle" type="button" role="switch" aria-checked="true" aria-label="Dark mode" data-theme-toggle>
              <span className="t-dark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /></svg></span><span className="t-light"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><circle cx={12} cy={12} r={4} /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg></span>
            </button>
            <a className="btn-bracket" href="/contact"><i className="c3" /><i className="c4" /><span className="roll">Contact</span></a>
            <button className="icon-btn menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="menu" data-menu-open><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 9h16" /><path d="M4 15h16" /></svg></button>
          </div>
        </header>
        <div className="menu" id="menu" aria-hidden="true" role="dialog" aria-label="Menu">
          <button className="icon-btn menu__close" type="button" aria-label="Close menu" data-menu-close><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M6 6l12 12" /><path d="M18 6L6 18" /></svg></button>
          <nav className="menu__links" aria-label="Mobile">
            <a href="/">Home</a><a href="/work">Work</a><a href="/studio">Studio</a><a href="/services">Services</a><a href="/journal">Journal</a><a href="/contact">Contact</a>
          </nav>
          <div className="stack" style={{'--stack-gap': '16px'}}>
            <button className="theme-toggle" type="button" role="switch" aria-checked="true" aria-label="Dark mode" data-theme-toggle><span className="t-dark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /></svg></span><span className="t-light"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><circle cx={12} cy={12} r={4} /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg></span></button>
            <p className="t-caption c-tertiary">dottodesign.d2d@gmail.com Â· @dot.todesign</p>
          </div>
        </div>
        <nav className="dock" aria-label="Quick navigation">
          <a className="nav-link" data-nav="work" href="/work">Work</a>
          <a className="nav-link" data-nav="studio" href="/studio">Studio</a>
          <a href="/" aria-label="Home" className="logo__mark" data-magnetic><svg aria-hidden="true" focusable="false" viewBox="0 0 433 282" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M188.399 281.71H0V244.385H188.399V281.71Z" fill="currentColor" />
              <path fillRule="evenodd" clipRule="evenodd" d="M188.399 131.524H188.396C188.397 131.672 188.399 131.82 188.399 131.968C188.399 184.238 146.224 226.612 94.1995 226.612C42.1746 226.612 0 184.238 0 131.968C0 79.6979 42.1746 37.3244 94.1995 37.3244C115.566 37.3244 135.271 44.4729 151.075 56.5177V0H188.399V131.524ZM94.1995 74.6487C62.7883 74.6487 37.3243 100.312 37.3243 131.968C37.3243 163.625 62.7883 189.288 94.1995 189.288C125.611 189.288 151.075 163.625 151.075 131.968C151.075 100.312 125.611 74.6487 94.1995 74.6487Z" fill="currentColor" />
              <path d="M319.479 0C382.056 0 432.785 50.7289 432.785 113.306C432.785 175.141 383.252 225.404 321.701 226.588V226.612H261.271V189.253H321.701C362.637 188.077 395.461 154.526 395.461 113.306C395.461 71.3426 361.575 37.6014 319.612 37.6014C277.649 37.6014 244.041 71.3426 244.041 113.306C244.041 115.083 244.041 118.194 244.041 118.194V226.612H206.173V112.862H206.176C206.415 50.4889 257.049 0 319.479 0Z" fill="currentColor" />
            </svg>
          </a>
          <a className="nav-link" data-nav="journal" href="/journal">Journal</a>
          <a className="nav-link" data-nav="contact" href="/contact">Contact</a>
        </nav>
        <main id="main">
          {/* Individual case study temporarily hidden.
          <section className="case-hero" aria-label="AVC Infra">
            <img src="assets/img/avc-hero.jpg" alt="AVC Infra monogram and wordmark over a glass tower" data-parallax="0.12" />
            <div className="case-hero__text">
              <p className="t-bracket" style={{color: 'rgba(255,255,255,.75)'}} data-reveal>(Case study Â· Construction Â· Â©25)</p>
              <p className="t-h3" data-reveal>Innovating today. Sustaining tomorrow.</p>
            </div>
          </section>
          <section className="section" aria-labelledby="case-title">
            <div className="container">
              <h1 className="t-display-xl" id="case-title" data-split>AVC Infra</h1>
              <dl className="case-meta" data-reveal-group>
                <div className="meta-item" data-reveal><dt className="t-bracket">(Client)</dt><dd className="t-label-lg" style={{margin: 0}}>AVC Infra Pvt. Ltd.</dd></div>
                <div className="meta-item" data-reveal><dt className="t-bracket">(Services)</dt><dd className="t-label-lg" style={{margin: 0}}>Brand strategy Â· Identity Â· Guidelines Â· Stationery</dd></div>
                <div className="meta-item" data-reveal><dt className="t-bracket">(Industry)</dt><dd className="t-label-lg" style={{margin: 0}}>Construction &amp; real estate</dd></div>
                <div className="meta-item" data-reveal><dt className="t-bracket">(Year)</dt><dd className="t-label-lg" style={{margin: 0}}>2025</dd></div>
              </dl>
            </div>
          </section>
          <section className="section" aria-labelledby="challenge" style={{paddingTop: 0}}>
            <div className="container split-2">
              <div className="stack" style={{'--stack-gap': '20px'}}><p className="t-bracket" data-reveal>(The challenge)</p><h2 className="t-h2" id="challenge" data-split>A construction firm that needed to look like the future it builds.</h2></div>
              <div className="stack" style={{'--stack-gap': '24px', paddingTop: 48}} data-reveal-group>
                <p className="t-body-lg c-secondary" data-reveal>AVC Infra competes for high-net-worth real-estate projects where trust is earned before the first brick. Their identity was fragmented across sites, stationery and social â€” it didnâ€™t match the authority of their work.</p>
                <p className="t-body-lg c-secondary" data-reveal>We engineered a structural monogram that reads as vertical development and sustainable growth, then rolled it into a complete system: guidelines, stationery and signage-ready artwork.</p>
              </div>
            </div>
          </section>
          <section className="section" aria-labelledby="concept" style={{paddingTop: 0}}>
            <div className="container stack" style={{'--stack-gap': '32px'}}>
              <p className="t-bracket" id="concept" data-reveal>(Brand mark shape deduction)</p>
              <figure className="media-frame" data-reveal-img><img src="assets/img/avc-concept.png" alt="Brand mark shape deduction: abstract building form plus tree-inspired symmetry" loading="lazy" /></figure>
              <blockquote className="pull-quote" data-reveal><p className="t-h2 t-editorial">An abstract building form, balanced with tree-inspired symmetry â€” growth thatâ€™s engineered, not decorated.</p></blockquote>
            </div>
          </section>
          <section className="section" aria-label="Gallery" style={{paddingTop: 0}}>
            <div className="container stack" style={{'--stack-gap': '24px'}}>
              <figure className="media-frame" data-reveal-img><img src="assets/img/avc-stationery.jpg" alt="AVC Infra business card on concrete" loading="lazy" /></figure>
              <div className="grid-2">
                <figure className="media-frame" style={{aspectRatio: '66/52'}} data-reveal-img><img src="assets/img/arch-facade.jpg" alt="Architectural facade reference" loading="lazy" /></figure>
                <figure className="media-frame" style={{aspectRatio: '66/52'}} data-reveal-img><img src="assets/img/arch-wave.jpg" alt="Curved architectural lattice reference" loading="lazy" /></figure>
              </div>
            </div>
          </section>
          <section className="section" aria-labelledby="outcome" style={{paddingTop: 0}}>
            <div className="container stack" style={{'--stack-gap': '40px'}}>
              <p className="t-bracket" data-reveal>(Outcome)</p>
              <h2 className="t-h2" id="outcome" style={{maxWidth: 1000}} data-split>A distinctive, future-focused identity that commands architectural authority.</h2>
              <div className="grid-3" data-reveal-group>
                <article className="card stat-card" data-reveal><p className="t-bracket">(Assets delivered)</p><p className="t-numeric-lg" data-count={40} data-suffix="+">40+</p><p className="t-body-sm c-secondary">Logo suite, guidelines, stationery, signage and social templates.</p></article>
                <article className="card stat-card" data-reveal><p className="t-bracket">(Construction grid)</p><p className="t-numeric-lg" data-count={12} data-suffix="u">12u</p><p className="t-body-sm c-secondary">Every curve and stroke on one modular grid â€” legible from favicon to faÃ§ade.</p></article>
                <article className="card stat-card" data-reveal><p className="t-bracket">(Timeline)</p><p className="t-numeric-lg" data-count={4} data-suffix=" wks">4 wks</p><p className="t-body-sm c-secondary">Discovery to final guideline hand-off with weekly Loom reviews.</p></article>
              </div>
              <blockquote className="testimonial" style={{maxWidth: 560}} data-reveal><p className="t-body-xl">â€œA structural monogram that finally commands the architectural authority our projects deserve.â€</p><footer className="author"><span className="avatar">AV</span><span><b className="t-label-lg">Director</b><br /><span className="t-caption c-secondary">AVC Infra Pvt. Ltd.</span></span></footer></blockquote>
            </div>
          </section>
          <section className="section" aria-label="Next project" style={{paddingTop: 0}}>
            <div className="container">
              <a className="next-project" href="/work" data-cursor="Next">
                <img src="assets/img/rivanya-hero.jpg" alt="" loading="lazy" />
                <div><p className="t-bracket" style={{color: 'rgba(255,255,255,.75)'}}>(Next project)</p><p className="t-display-lg">Rivanya</p><p className="t-body-lg" style={{opacity: '.8'}}>Where culture inspires style</p></div>
              </a>
            </div>
          </section>
          */}
          <section className="section" aria-labelledby="case-coming-soon" style={{paddingTop: 'calc(var(--layout-header-height) + 96px)'}}>
            <div className="container cta__inner">
              <p className="t-bracket" data-reveal>(Case studies)</p>
              <h1 className="t-display-lg" id="case-coming-soon" data-split>Project stories are coming soon.</h1>
              <p className="t-body-xl c-secondary" data-reveal>For details about our work, get in touch with us.</p>
              <a className="btn" href="/contact" data-magnetic data-reveal><span className="roll">Contact us</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M7 17L17 7" /><path d="M8 7h9v9" /></svg></a>
            </div>
          </section>
        </main>
        <Footer />

      </div>
    </div>
  );
}


