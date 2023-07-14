import { Maybe, Tuple } from '../types';
import { Stack } from './stack';

export type Deployment = {
  web?: string;
  android?: string;
  ios?: string;
};

export interface SubProject {
  title: string;
  description: string;
  repository: Maybe<string>;
  deployment: Deployment;
}

export const defaultDimensions: Tuple<number> = [450, 220];

export interface Project {
  title: string;
  slug: string;
  website: string;
  banner: string;
  description: string;
  shortDescription?: string;
  repository: Maybe<string>;
  stack: Stack[];
  dimensions?: Tuple<number>; // Tuple of [height, width]
  screenshots: string[];
  deployment: Deployment;
  subProjects: SubProject[];
}

export const projects: Project[] = [
  {
    title: 'Darkblock',
    slug: 'darkblock',
    banner: '/static/projects/darkblock/banner.png',
    website: 'https://www.darkblock.io/',
    description: `Darkblock is Web3's missing encryption and access control layer. It is a decentralized chain-agnostic protocol that enables creators to control the distribution and monetization of their content.

    A darkblock is a piece of content encrypted by the Darkblock Protocol and stored on Arweave (where it will live for at least 200 years).
    
    A darkblock is immutably linked to an NFT. Only the creator of the NFT can add a darkblock to it and only the owner of the NFT can access it. NFT creators can add darkblock unlockable content even after the NFT has been sold.`,
    shortDescription: 'Unlock the power of Web3-native publishing',
    repository: 'https://github.com/karanpratapsingh/HyperTrade',
    stack: [
      Stack.javascript,
      Stack.nodejs,
      Stack.tailwind,
      Stack.typescript,
      Stack.react,
      Stack.awslambda,
      Stack.awsdynamodb,
      Stack.awscloudwatch,
      Stack.docker,
      Stack.expo,
      Stack.express,
      Stack.nextjs,
      Stack.awssynthetics,
      Stack.awsrds,
      Stack.moesif,
      Stack.metabase,
      Stack.looker,
    ],
    dimensions: [360, 640],
    screenshots: [
      'https://drive.google.com/uc?export=view&id=18ft-hSELtABageq1t1caF--mt4HX-gGn',
      'https://firebasestorage.googleapis.com/v0/b/portfolio-8fa71.appspot.com/o/projects%2Fhypertrade%2Fdataframe.png?alt=media&token=f2e6523c-c9de-4fde-8fb3-434c74eb20d8',
      'https://firebasestorage.googleapis.com/v0/b/portfolio-8fa71.appspot.com/o/projects%2Fhypertrade%2Fportfolio.png?alt=media&token=8f4e3da1-2dc2-4382-9fc8-1fbc18a98146',
      'https://firebasestorage.googleapis.com/v0/b/portfolio-8fa71.appspot.com/o/projects%2Fhypertrade%2Fconfig.png?alt=media&token=f619b1da-47d5-4c33-b4d0-368adaead1c8',
      'https://firebasestorage.googleapis.com/v0/b/portfolio-8fa71.appspot.com/o/projects%2Fhypertrade%2Fconfig-strategy.png?alt=media&token=68693230-4fce-420b-b419-d211a9568dc5',
      'https://firebasestorage.googleapis.com/v0/b/portfolio-8fa71.appspot.com/o/projects%2Fhypertrade%2Fcharts-indicators.png?alt=media&token=21c7875f-5abe-4ceb-8057-4d7a70b67d33',
      'https://firebasestorage.googleapis.com/v0/b/portfolio-8fa71.appspot.com/o/projects%2Fhypertrade%2Ftelegram.png?alt=media&token=110874dd-fb96-4dd2-b299-12a62b092a04',
    ],
    deployment: {
      web: 'https://www.darkblock.io/',
    },
    subProjects: [
      {
        title: 'Darkblock Web-App',
        repository: null,
        description:
          'Staff app for stewards restaurant staff, easily update menu, product availability and take live orders from customers.',
        deployment: {
          android:
            'https://play.google.com/store/apps/details?id=app.stewards.staff&hl=en',
        },
      },
      {
        title: 'Admin Dashboard',
        repository: null,
        description: `The Darkblock web app, app.darkblock.io is a place where NFT creators can add Darkblock unlockable content to NFTs and NFT collections they have created.

          It is also a place where owners can access Darkblock unlockable content that has been added to NFTs they own.`,
        deployment: {
          web: 'https://manage.stewards.app',
        },
      },
      {
        title: 'Self Checkout',
        repository: null,
        description:
          "Stewards self checkout solution for customers who don't like waiting. Available on demand for iPad and tablets.",
        deployment: {},
      },
    ],
  },
];
