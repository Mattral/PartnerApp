
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

let users = [
  {
    id: 1,
    name: 'Mattral',
    email: 'minmattral@gmail.com',
    password: 'aAertyuiop@1' 
  },
  {
    id: 2,
    name: 'Min Htet Myet',
    email: 'mattralminn@gmail.com',
    password: '1234ABB!123a'
  }
];

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET_KEY,
  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'login',
      credentials: {
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        const user = users.find(
          u => u.email === credentials?.email && u.password === credentials?.password
        );

        if (user) {
          // Return user object with `id` as string
          return {
            id: user.id.toString(), // Convert `id` to string
            name: user.name,
            email: user.email,
            accessToken: 'simulated-access-token', // Simulated token
          };
        } else {
          throw new Error('Invalid credentials');
        }
      }
    }),

    // Register provider
    CredentialsProvider({
      id: 'register',
      name: 'Register',
      credentials: {
        firstname: { name: 'firstname', label: 'Firstname', type: 'text', placeholder: 'Enter Firstname' },
        lastname: { name: 'lastname', label: 'Lastname', type: 'text', placeholder: 'Enter Lastname' },
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
        company: { name: 'company', label: 'Company', type: 'text', placeholder: 'Enter Company' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        const newUser = {
          id: (users.length + 1).toString(), // Ensure id is a string
          name: `${credentials?.firstname} ${credentials?.lastname}`,
          email: credentials?.email,
          password: credentials?.password,
        };

        //users.push(newUser);

        return {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          accessToken: 'simulated-access-token',
        };
      }
    })
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        // @ts-ignore
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.id = token.id;
      session.token = token;
      return session;
    }
  },

  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.NEXT_APP_JWT_TIMEOUT!)
  },

  jwt: {
    secret: process.env.NEXT_APP_JWT_SECRET
  },

  pages: {
    signIn: '/login',
    newUser: '/register'
  }
};

/*

import axios from 'axios';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'Login',
      credentials: {
        email: { name: 'email', label: 'Email', type: 'email' },
        password: { name: 'password', label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password are required');
          }

          const data = new FormData();
          data.append('email', credentials.email);
          data.append('password', credentials.password);

          const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lawonearth.co.uk';
          const response = await axios.post(`${baseUrl}/api/auth/core/login`, data, {
            headers: {
              'COMPANY-CODE': process.env.COMPANY_CODE || 'def-mc-admin',
              'FRONTEND-KEY': process.env.FRONTEND_KEY || 'XXX',
            },
          });

          if (response.status === 200 && response.data.status === 'treatmentSuccess') {
            const user = response.data.data.primaryData;
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              accessToken: user.authorization,
            };
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error('Axios error: ' + error.response?.data?.message || error.message);
          }
          // @ts-ignore
          throw new Error('Authentication failed: ' + error.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      // @ts-ignore
      session.accessToken = token.accessToken; // Store accessToken in session if needed
      return session;
    },
  },
  session: {
    strategy: 'jwt' as const, // Fix for type mismatch by asserting the type
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
};



*/


/*
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios'; // Make sure axios is installed and imported

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET_KEY,
  providers: [
    // Login provider
    CredentialsProvider({
      id: 'login',
      name: 'login',
      credentials: {
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        try {
          const data = new FormData();
          data.append('email', credentials?.email ?? '');
          data.append('password', credentials?.password ?? '');

          // Login API call
          const response = await axios({
            method: 'post',
            url: 'https://lawonearth.co.uk/api/auth/core/login',
            headers: {
              'COMPANY-CODE': 'def-mc-admin',
              'FRONTEND-KEY': 'XXX',///process.env.FRONTEND_KEY, // Replace with your actual FRONTEND-KEY
              //'Authorization': `Bearer ${process.env.BEARER_TOKEN}` // Optional if required
            },
            data: data
          });

          // Assuming API returns user data and serviceToken
          const user = response.data.user;
          const accessToken = response.data.serviceToken;

          if (user && accessToken) {
            // Return user data along with accessToken
            return {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
              accessToken: accessToken
            };
          } else {
            throw new Error('Failed to login');
          }
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Login failed');
        }
      }
    }),

    // Register provider
    CredentialsProvider({
      id: 'register',
      name: 'Register',
      credentials: {
        firstname: { name: 'firstname', label: 'Firstname', type: 'text', placeholder: 'Enter Firstname' },
        lastname: { name: 'lastname', label: 'Lastname', type: 'text', placeholder: 'Enter Lastname' },
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' },
        password_confirmation: { name: 'password_confirmation', label: 'Confirm Password', type: 'password', placeholder: 'Confirm Password' }
      },
      async authorize(credentials) {
        try {
          const data = new FormData();
          data.append('pers_fName', credentials?.firstname ?? '');
          data.append('pers_lName', credentials?.lastname ?? '');
          data.append('email', credentials?.email ?? '');
          data.append('password', credentials?.password ?? '');
          data.append('password_confirmation', credentials?.password_confirmation ?? '');

          // Register API call
          const response = await axios({
            method: 'post',
            url: 'https://lawonearth.co.uk/api/auth/core/register',
            headers: {
              'COMPANY-CODE': 'def-mc-admin',
              'FRONTEND-KEY': 'XXX',//process.env.FRONTEND_KEY,
              //'Authorization': `Bearer ${process.env.BEARER_TOKEN}` // Optional if required
            },
            data: data
          });

          // Assuming API returns user data
          const user = response.data.user;
          const accessToken = response.data.serviceToken;

          if (user && accessToken) {
            return {
              id: user.id.toString(),
              name: `${credentials?.firstname} ${credentials?.lastname}`,
              email: user.email,
              accessToken: accessToken
            };
          } else {
            throw new Error('Failed to register');
          }
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Registration failed');
        }
      }
    })
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        // @ts-ignore
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.id = token.id;
      session.token = token;
      return session;
    }
  },

  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.NEXT_APP_JWT_TIMEOUT!)
  },

  jwt: {
    secret: process.env.NEXT_APP_JWT_SECRET
  },

  pages: {
    signIn: '/login',
    newUser: '/register'
  }
};
*/


/*
//______________________________________________



*/
/*
//________________________________ ORIGINAL

import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'utils/axios';

let users = [
  {
    id: 1,
    name: 'Min Htet',
    email: 'minmattral@gmail.com',
    password: 'aAertyuiop@1'
  }
];

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET_KEY,
  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'login',
      credentials: {
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            'https://lawonearth.co.uk/api/auth/core/login',
            {
              email: credentials?.email,
              password: credentials?.password
            },
            {
              headers: {
                'COMPANY-CODE': 'def-mc-admin',
                'FRONTEND-KEY':'XXX', //  || process.env.FRONTEND_KEY
                //'Authorization': `Bearer ${process.env.AUTH_TOKEN}`, // Replace with actual Bearer token
              }
            }
          );

          if (response && response.data.user) {
            response.data.user['accessToken'] = response.data.serviceToken;
            return response.data.user;
          }
        } catch (error: any) {
          const errorMessage = error?.response?.data?.message || 'Login failed';
          throw new Error(errorMessage);
        }
      }
    }),
    // Register provider can remain as it is
    CredentialsProvider({
      id: 'register',
      name: 'Register',
      credentials: {
        firstname: { name: 'firstname', label: 'Firstname', type: 'text', placeholder: 'Enter Firstname' },
        lastname: { name: 'lastname', label: 'Lastname', type: 'text', placeholder: 'Enter Lastname' },
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
        company: { name: 'company', label: 'Company', type: 'text', placeholder: 'Enter Company' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        try {
          const user = await axios.post('https://lawonearth.co.uk/api/auth/core/register', {
            firstName: credentials?.firstname,
            lastName: credentials?.lastname,
            company: credentials?.company,
            password: credentials?.password,
            email: credentials?.email
          });

          if (user) {
            users.push(user.data);
            return user.data;
          }
        } catch (e: any) {
          const errorMessage = e?.response.data.message;
          throw new Error(errorMessage);
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        // @ts-ignore
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.provider = account?.provider;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.provider = token.provider;
        session.token = token;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.NEXT_APP_JWT_TIMEOUT!)
  },
  jwt: {
    secret: process.env.NEXT_APP_JWT_SECRET
  },
  pages: {
    signIn: '/login',
    newUser: '/register'
  }
};
*/

/*
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'utils/axios';

let users = [
  {
    id: 1,
    name: 'Jone Doe',
    email: 'minmattral@gmail.com',
    password: 'aAertyuiop@1'
  }
];

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET_KEY,
  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'login',
      credentials: {
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        try {
          const user = await axios.post('https://lawonearth.co.uk/api/auth/core/login', {
            password: credentials?.password,
            email: credentials?.email
          });

          if (user) {
            user.data.user['accessToken'] = user.data.serviceToken;
            return user.data.user;
          }
        } catch (e: any) {
          const errorMessage = e?.response.data.message;
          throw new Error(errorMessage);
        }
      }
    }),
    CredentialsProvider({
      id: 'register',
      name: 'Register',
      credentials: {
        firstname: { name: 'firstname', label: 'Firstname', type: 'text', placeholder: 'Enter Firstname' },
        lastname: { name: 'lastname', label: 'Lastname', type: 'text', placeholder: 'Enter Lastname' },
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
        company: { name: 'company', label: 'Company', type: 'text', placeholder: 'Enter Company' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        try {
          const user = await axios.post('https://lawonearth.co.uk/api/auth/core/register', {
            firstName: credentials?.firstname,
            lastName: credentials?.lastname,
            company: credentials?.company,
            password: credentials?.password,
            email: credentials?.email
          });

          if (user) {
            users.push(user.data);
            return user.data;
          }
        } catch (e: any) {
          const errorMessage = e?.response.data.message;
          throw new Error(errorMessage);
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        // @ts-ignore
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.provider = account?.provider;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.provider = token.provider;
        session.token = token;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.NEXT_APP_JWT_TIMEOUT!)
  },
  jwt: {
    secret: process.env.NEXT_APP_JWT_SECRET
  },
  pages: {
    signIn: '/login',
    newUser: '/register'
  }
};
*/