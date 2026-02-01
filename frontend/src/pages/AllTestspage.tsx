import React, { useEffect, useState } from "react";
import { useApp } from "../contexts/AppContext";
import { TestCard } from "../components/TestCard";
// import { mockTests } from '../data/mockData';
// console.log(mockTests)
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Search, Filter } from "lucide-react";

export const AllTestsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { setCurrentPage, setSelectedTest, user, mockTests } = useApp();
  console.log(mockTests);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStartTest = (test: any) => {
    if (!user) {
      setCurrentPage("login");
      return;
    }
    setSelectedTest(test);
    setCurrentPage("test-instructions");
  };

  const filteredTests = mockTests.filter((test) => {
    const matchesSearch =
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDifficulty =
      difficultyFilter === "all" || test.difficulty === difficultyFilter;
    const matchesSubject =
      subjectFilter === "all" || test.subject === subjectFilter;
    const matchesType =
      typeFilter === "all" ||
      (typeFilter === "free" && !test.isPaid) ||
      (typeFilter === "paid" && test.isPaid);
    return matchesSearch && matchesDifficulty && matchesSubject && matchesType;
  });

  const subjects = Array.from(new Set(mockTests.map((t) => t.subject)));
  if (loading) {
    <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">All Mock Tests</h1>
        <p className="text-muted-foreground">
          Explore our comprehensive collection of tests and start practicing
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tests by name, subject, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-100"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Filters:</span>
          </div>
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent className="bg-gray-50">
              <SelectItem className="bg-gray-100" value="all">
                All Subjects
              </SelectItem>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent className="bg-gray-50">
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-50">
              <SelectItem value="all">All Tests</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="paid">Pro</SelectItem>
            </SelectContent>
          </Select>
          {(searchQuery ||
            difficultyFilter !== "all" ||
            subjectFilter !== "all" ||
            typeFilter !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setDifficultyFilter("all");
                setSubjectFilter("all");
                setTypeFilter("all");
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredTests.length} test{filteredTests.length !== 1 ? "s" : ""}{" "}
          found
        </p>
      </div>
      {filteredTests.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTests.map((test) => (
            <TestCard
              key={test.id}
              {...test}
              onStart={() => handleStartTest(test)}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3>No tests found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters to find what you're looking
              for
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setDifficultyFilter("all");
              setSubjectFilter("all");
              setTypeFilter("all");
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};
