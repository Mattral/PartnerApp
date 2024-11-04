import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card, Button } from 'antd';
import { IconFont } from 'components/icon-font';
import './home.scss';

const { Meta } = Card;

interface HomeProps extends RouteComponentProps {
  status: string;
  onLeaveOrJoinSession: () => void;
}

const Home: React.FunctionComponent<HomeProps> = (props) => {
  const {  status, onLeaveOrJoinSession } = props;

  const onCardClick = (type: string) => {
  };

  const featureList = [
    {
      key: 'video',
      icon: 'icon-meeting',
      title: 'Audio, Video & Screen Share',
      description: 'Start/Stop Audio, Mute/Unmute, Start/Stop Video, and Share Screen seamlessly.'
    },
    {
      key: 'preview',
      icon: 'icon-meeting',
      title: 'Local Preview',
      description: 'Audio and Video preview before Meeting'
    }
  ];

  const actionText = status === 'connected' ? 'Leave Session' : status === 'closed' ? 'Join Session' : null;

  return (
    <div className="home-page">
      {/* Navigation */}
      <div className="nav">
        <a href="/" className="nav__home">
          <span>VideoSDK Demo</span>
        </a>
      </div>

      {/* Home Content */}
      <div className="home__content">
        <h1>Explore Zoom Video SDK Features</h1>
        <div className="feature__grid">
          {featureList.map((feature) => {
            const { key, icon, title, description } = feature;
            return (
              <Card
                cover={<IconFont style={{ fontSize: '64px', color: '#4F46E5' }} type={icon} />}
                hoverable
                className="feature__card"
                key={key}
                onClick={() => onCardClick(key)}
              >
                <Meta title={title} description={description} />
              </Card>
            );
          })}
        </div>

        {/* Centered Join/Leave Button */}
        {actionText && (
          <div className="session-action">
            <Button type="primary" size="large" className="session-action__btn" onClick={onLeaveOrJoinSession}>
              {actionText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
