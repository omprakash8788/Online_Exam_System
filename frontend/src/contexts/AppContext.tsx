import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin";
  avatar?: string;
}

interface Test {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: number;
  totalQuestions: number;
  markingScheme: { correct: number; wrong: number };
  isPaid: boolean;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  markedForReview?: boolean;
  selectedAnswer?: number;
}

interface TestResult {
  id: string;
  testId: string;
  testTitle: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  score: number;
  percentage: number;
  date: string;
}

interface AppContextType {
  user: User | null;
  // login: (email: string, password: string, role?: 'student' | 'admin') => void;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message: string; user?: User }>;

  logout: () => void;
  // signup: (name: string, email: string, password: string, role: 'student' | 'admin') => void;
  signup: (
    name: string,
    email: string,
    password: string,
    role: "student" | "admin",
  ) => Promise<{ success: boolean; message: string }>;
  theme: "light" | "dark";
  toggleTheme: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  selectedTest: Test | null;
  setSelectedTest: (test: Test | null) => void;
  currentTestQuestions: Question[];
  setCurrentTestQuestions: (questions: Question[]) => void;
  testResults: TestResult[];
  checkAuth: () => void;
  isAuthenticated: boolean;
  addTestResult: (result: TestResult) => void;
  mockTests: Test[];
  loading: boolean;
  fetchAllTests: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  console.log("user data", user);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [currentTestQuestions, setCurrentTestQuestions] = useState<Question[]>(
    [],
  );
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [mockTests, setMockTests] = useState<Test[]>([]);
  console.log(mockTests)
  const [loading, setLoading] = useState(false);
   const fetchAllTests = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tests`);
      setMockTests(res.data.data); 
    } catch (error) {
      console.error("Failed to fetch tests", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(()=>{
    fetchAllTests()
  },[])

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
    checkAuth();
  }, []);

  // const login = (email: string, password: string, role: 'student' | 'admin' = 'student') => {
  //   // Mock login
  //   const mockUser: User = {
  //     id: '1',
  //     name: email.split('@')[0],
  //     email,
  //     role,
  //   };
  //   setUser(mockUser);
  //   setCurrentPage('dashboard');
  // };

  const login = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; message: string; user?: User }> => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.message || "Login failed" };
      }
      setUser(data.user);
      setCurrentPage("dashboard");
      return {
        success: true,
        message: data.message,
        user: data.user,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Network error",
      };
    }
  };

  const checkAuth = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!res.ok) throw new Error("Not authenticated");
      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        setUser(data.user.user);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Network error",
      };
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!res.ok) throw new Error("Not authenticated");

      const data = await res.json();

      if (data.success) {
        setUser(null);
        setIsAuthenticated(false);
        setCurrentPage("home");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Network error",
      };
    }
  };

  // const signup = (name: string, email: string, password: string, role: 'student' | 'admin') => {
  //   // Mock signup
  //   const mockUser: User = {
  //     id: '1',
  //     name,
  //     email,
  //     role,
  //   };
  //   setUser(mockUser);
  //   setCurrentPage('dashboard');
  // };

  const signup = async (
    name: string,
    email: string,
    password: string,
    role: "student" | "admin",
  ) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, role }),
        },
      );
      console.log(res);

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || "Signup failed" };
      }

      return { success: true, message: data.message };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return { success: false, message: error.message || "Network error" };
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const addTestResult = (result: TestResult) => {
    setTestResults((prev) => [result, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        checkAuth,
        isAuthenticated,
        logout,
        signup,
        theme,
        toggleTheme,
        currentPage,
        setCurrentPage,
        selectedTest,
        setSelectedTest,
        currentTestQuestions,
        setCurrentTestQuestions,
        testResults,
        addTestResult,
        mockTests,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
