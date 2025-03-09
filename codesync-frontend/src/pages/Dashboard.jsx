import { useState, useEffect } from "react";
import { Activity, Award, Users, Star, TrendingUp, Search, ChevronRight, Code, BookOpen, GitBranch, Trophy } from "lucide-react";

const Dashboard = () => {
  const [handle, setHandle] = useState("");
  const [userData, setUserData] = useState(null);
  const [gfgHandle, setGfgHandle] = useState("");
  const [gfgData, setGfgData] = useState(null);
  const [error, setError] = useState(null);
  const [gfgError, setGfgError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gfgLoading, setGfgLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [recentGfgSearches, setRecentGfgSearches] = useState([]);
  const [activeTab, setActiveTab] = useState("codeforces");

  useEffect(() => {
    // Load recent searches from local storage on component mount
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
    
    const savedGfgSearches = localStorage.getItem("recentGfgSearches");
    if (savedGfgSearches) {
      setRecentGfgSearches(JSON.parse(savedGfgSearches));
    }
  }, []);

  const saveSearch = (handle) => {
    const updatedSearches = [handle, ...recentSearches.filter(s => s !== handle)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const saveGfgSearch = (handle) => {
    const updatedSearches = [handle, ...recentGfgSearches.filter(s => s !== handle)].slice(0, 5);
    setRecentGfgSearches(updatedSearches);
    localStorage.setItem("recentGfgSearches", JSON.stringify(updatedSearches));
  };

  const fetchUserData = async (searchHandle) => {
    const handleToSearch = searchHandle || handle;
    if (!handleToSearch) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://codeforces.com/api/user.info?handles=${handleToSearch}`
      );
      
      if (!response.ok) {
        throw new Error("API request failed");
      }
      
      const data = await response.json();
      setUserData(data.result[0]);
      saveSearch(handleToSearch);
    } catch (err) {
      setError("User not found or API error. Please try again.");
      setUserData(null);
    }
    
    setLoading(false);
  };

const fetchGfgData = async (searchHandle) => {
  const handleToSearch = searchHandle || gfgHandle;
  if (!handleToSearch) return;

  setGfgLoading(true);
  setGfgError(null);

  try {
    const response = await fetch(
      `https://geeks-for-geeks-api.vercel.app/${handleToSearch}`,
      { mode: "no-cors" }
    );
    

    if (!response.ok) {
      throw new Error("GFG API request failed");
    }

    const data = await response.json();
    setGfgData(data);
    saveGfgSearch(handleToSearch);
  } catch (err) {
    setGfgError("User not found or GFG API error. Please try again.");
    setGfgData(null);
  }

  setGfgLoading(false);
};


  // Get text color based on user rank
  const getRankTextColor = (rank) => {
    const rankColors = {
      'newbie': 'text-gray-700',
      'pupil': 'text-green-600',
      'specialist': 'text-cyan-600',
      'expert': 'text-blue-600',
      'candidate master': 'text-purple-600',
      'master': 'text-orange-600',
      'international master': 'text-orange-700',
      'grandmaster': 'text-red-600',
      'international grandmaster': 'text-red-700',
      'legendary grandmaster': 'text-red-800',
    };
    return rankColors[rank?.toLowerCase()] || 'text-gray-700';
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (activeTab === "codeforces") {
        fetchUserData();
      } else {
        fetchGfgData();
      }
    }
  };

  // Get difficulty color for GFG problems
  const getDifficultyColor = (difficulty) => {
    const colors = {
      'easy': 'text-green-600',
      'medium': 'text-yellow-600',
      'hard': 'text-red-600',
      'basic': 'text-blue-600',
    };
    return colors[difficulty?.toLowerCase()] || 'text-gray-700';
  };

  // Get progress bar color for GFG difficulty
  const getDifficultyBgColor = (difficulty) => {
    const colors = {
      'easy': 'bg-green-500',
      'medium': 'bg-yellow-500',
      'hard': 'bg-red-500',
      'basic': 'bg-blue-500',
    };
    return colors[difficulty?.toLowerCase()] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Search panel */}
          <div className="w-full md:w-1/3 mr-0 md:mr-6 mb-6 md:mb-0">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-indigo-700 mb-2">CP Profile Explorer</h1>
              <p className="text-gray-600">Search for competitive programmers across platforms</p>
            </div>
            
            {/* Platform tabs */}
            <div className="mb-4 flex border-b border-gray-200">
              <button 
                className={`py-2 px-4 font-medium ${activeTab === "codeforces" 
                  ? "text-indigo-600 border-b-2 border-indigo-600" 
                  : "text-gray-500 hover:text-indigo-500"}`}
                onClick={() => setActiveTab("codeforces")}
              >
                Codeforces
              </button>
              <button 
                className={`py-2 px-4 font-medium ${activeTab === "gfg" 
                  ? "text-green-600 border-b-2 border-green-600" 
                  : "text-gray-500 hover:text-green-500"}`}
                onClick={() => setActiveTab("gfg")}
              >
                GeeksforGeeks
              </button>
            </div>
            
            {activeTab === "codeforces" ? (
              <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-indigo-800 mb-4">Find a Codeforces User</h2>
                <div className="relative mb-4">
                  <input
                    type="text"
                    className="w-full p-3 pl-10 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300"
                    placeholder="Enter Codeforces handle"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Search className="absolute left-3 top-3 text-indigo-400" size={20} />
                </div>
                
                <button
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
                  onClick={() => fetchUserData()}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Searching...
                    </span>
                  ) : (
                    <span>Search Profile</span>
                  )}
                </button>
                
                {recentSearches.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Recent searches</h3>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          className="w-full text-left px-3 py-2 rounded-md hover:bg-indigo-50 text-indigo-700 flex items-center justify-between transition-colors group"
                          onClick={() => {
                            setHandle(search);
                            fetchUserData(search);
                          }}
                        >
                          <span>{search}</span>
                          <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-green-800 mb-4">Find a GeeksforGeeks User</h2>
                <div className="relative mb-4">
                  <input
                    type="text"
                    className="w-full p-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300"
                    placeholder="Enter GFG username"
                    value={gfgHandle}
                    onChange={(e) => setGfgHandle(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Search className="absolute left-3 top-3 text-green-400" size={20} />
                </div>
                
                <button
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
                  onClick={() => fetchGfgData()}
                  disabled={gfgLoading}
                >
                  {gfgLoading ? (
                    <span className="flex items-center">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Searching...
                    </span>
                  ) : (
                    <span>Search Profile</span>
                  )}
                </button>
                
                {recentGfgSearches.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Recent searches</h3>
                    <div className="space-y-2">
                      {recentGfgSearches.map((search, index) => (
                        <button
                          key={index}
                          className="w-full text-left px-3 py-2 rounded-md hover:bg-green-50 text-green-700 flex items-center justify-between transition-colors group"
                          onClick={() => {
                            setGfgHandle(search);
                            fetchGfgData(search);
                          }}
                        >
                          <span>{search}</span>
                          <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === "codeforces" && error && (
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500 text-red-700 mb-6">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            {activeTab === "gfg" && gfgError && (
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500 text-red-700 mb-6">
                <p className="font-medium">Error</p>
                <p className="text-sm">{gfgError}</p>
              </div>
            )}
          </div>
          
          {/* Right side - User data display */}
          <div className="w-full md:w-2/3">
            {/* Codeforces Profile */}
            {activeTab === "codeforces" && (
              <>
                {loading && !userData && (
                  <div className="h-64 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-indigo-700 animate-pulse">Fetching user data...</p>
                  </div>
                )}
                
                {userData && (
                  <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {/* Header section */}
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
                      <div className="flex items-start">
                        <img
                          src={userData.titlePhoto}
                          alt="Profile"
                          className="w-20 h-20 rounded-full border-2 border-white object-cover mr-6"
                        />
                        <div>
                          <h2 className="text-2xl font-bold">{userData.handle}</h2>
                          <div className="flex items-center mt-1">
                            <span className={`inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium`}>
                              {userData.rank || "Unranked"}
                            </span>
                            {userData.organization && (
                              <span className="ml-2 text-sm opacity-90">· {userData.organization}</span>
                            )}
                          </div>
                          {userData.firstName || userData.lastName ? (
                            <p className="mt-2 text-sm opacity-90">{`${userData.firstName || ""} ${userData.lastName || ""}`}</p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    
                    {/* Stats section */}
                    <div className="p-6">
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="border border-indigo-100 rounded-lg p-4 bg-gradient-to-r from-indigo-50 to-indigo-100">
                          <p className="text-sm text-indigo-600 mb-1 flex items-center">
                            <TrendingUp size={16} className="mr-1" />
                            Current Rating
                          </p>
                          <p className="text-2xl font-bold text-indigo-800">{userData.rating || "N/A"}</p>
                        </div>
                        
                        <div className="border border-purple-100 rounded-lg p-4 bg-gradient-to-r from-purple-50 to-purple-100">
                          <p className="text-sm text-purple-600 mb-1 flex items-center">
                            <Award size={16} className="mr-1" />
                            Max Rating
                          </p>
                          <p className="text-2xl font-bold text-purple-800">{userData.maxRating || "N/A"}</p>
                        </div>
                        
                        <div className="border border-blue-100 rounded-lg p-4 bg-gradient-to-r from-blue-50 to-blue-100">
                          <p className="text-sm text-blue-600 mb-1 flex items-center">
                            <Users size={16} className="mr-1" />
                            Friends
                          </p>
                          <p className="text-2xl font-bold text-blue-800">{userData.friendOfCount || "0"}</p>
                        </div>
                        
                        <div className="border border-indigo-100 rounded-lg p-4 bg-gradient-to-r from-indigo-50 to-indigo-100">
                          <p className="text-sm text-indigo-600 mb-1 flex items-center">
                            <Activity size={16} className="mr-1" />
                            Contribution
                          </p>
                          <p className="text-2xl font-bold text-indigo-800">{userData.contribution || "0"}</p>
                        </div>
                      </div>
                      
                      {/* Rank information */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Rank Information</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Current Rank</p>
                              <p className={`font-medium ${getRankTextColor(userData.rank)}`}>{userData.rank || "Unranked"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Max Rank</p>
                              <p className={`font-medium ${getRankTextColor(userData.maxRank)}`}>{userData.maxRank || "Unranked"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Additional information */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Additional Information</h3>
                        <div className="space-y-3">
                          {userData.registrationTimeSeconds && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Registered</span>
                              <span className="text-gray-800">
                                {new Date(userData.registrationTimeSeconds * 1000).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          
                          {userData.lastOnlineTimeSeconds && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Last online</span>
                              <span className="text-gray-800">
                                {new Date(userData.lastOnlineTimeSeconds * 1000).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">Country</span>
                            <span className="text-gray-800">{userData.country || "Not specified"}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">City</span>
                            <span className="text-gray-800">{userData.city || "Not specified"}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="mt-6 flex">
                        <a 
                          href={`https://codeforces.com/profile/${userData.handle}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center mr-3"
                        >
                          <Star size={16} className="mr-2" />
                          View Full Profile
                        </a>
                        
                        <a 
                          href={`https://codeforces.com/contests/with/${userData.handle}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors duration-300 flex items-center"
                        >
                          View Contests
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                
                {!loading && !userData && !error && (
                  <div className="h-64 flex flex-col items-center justify-center bg-white rounded-lg shadow-md">
                    <Search size={48} className="text-indigo-200 mb-4" />
                    <p className="text-gray-500">Search for a Codeforces user to see their profile</p>
                  </div>
                )}
              </>
            )}
            
            {/* GeeksforGeeks Profile */}
            {activeTab === "gfg" && (
              <>
                {gfgLoading && !gfgData && (
                  <div className="h-64 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-green-700 animate-pulse">Fetching GFG user data...</p>
                  </div>
                )}
                
                {gfgData && (
                  <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {/* Header section */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                      <div className="flex items-start">
                        <img
                          src={gfgData.info.profilePicture}
                          alt="Profile"
                          className="w-20 h-20 rounded-full border-2 border-white object-cover mr-6"
                        />
                        <div>
                          <h2 className="text-2xl font-bold">{gfgData.info.userName}</h2>
                          <div className="flex items-center mt-1">
                            <span className="text-sm opacity-90">{gfgData.info.fullName}</span>
                          </div>
                          {gfgData.info.institute && (
                            <p className="mt-2 text-sm opacity-90">{gfgData.info.institute}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Stats section */}
                    <div className="p-6">
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="border border-green-100 rounded-lg p-4 bg-gradient-to-r from-green-50 to-green-100">
                          <p className="text-sm text-green-600 mb-1 flex items-center">
                            <Code size={16} className="mr-1" />
                            Coding Score
                          </p>
                          <p className="text-2xl font-bold text-green-800">{gfgData.info.codingScore}</p>
                        </div>
                        
                        <div className="border border-emerald-100 rounded-lg p-4 bg-gradient-to-r from-emerald-50 to-emerald-100">
                          <p className="text-sm text-emerald-600 mb-1 flex items-center">
                            <BookOpen size={16} className="mr-1" />
                            Problems Solved
                          </p>
                          <p className="text-2xl font-bold text-emerald-800">{gfgData.info.totalProblemsSolved}</p>
                        </div>
                        
                        <div className="border border-teal-100 rounded-lg p-4 bg-gradient-to-r from-teal-50 to-teal-100">
                          <p className="text-sm text-teal-600 mb-1 flex items-center">
                            <GitBranch size={16} className="mr-1" />
                            Current Streak
                          </p>
                          <p className="text-2xl font-bold text-teal-800">{gfgData.info.currentStreak}</p>
                        </div>
                        
                        <div className="border border-green-100 rounded-lg p-4 bg-gradient-to-r from-green-50 to-green-100">
                          <p className="text-sm text-green-600 mb-1 flex items-center">
                            <Trophy size={16} className="mr-1" />
                            Max Streak
                          </p>
                          <p className="text-2xl font-bold text-green-800">{gfgData.info.maxStreak}</p>
                        </div>
                      </div>
                      
                      {/* Institute rank information */}
                      {gfgData.info.institute && (
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-gray-700 mb-3">Institute Ranking</h3>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm text-gray-500">Institute</p>
                                <p className="font-medium text-gray-800">{gfgData.info.institute}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">Rank</p>
                                <p className="font-medium text-green-600">#{gfgData.info.instituteRank}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Problem solving stats */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Problem Solving Stats</h3>
                        <div className="space-y-4">
                          {/* Basic */}
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className={`font-medium ${getDifficultyColor('basic')}`}>Basic</span>
                              <span className="text-sm text-gray-600">{gfgData.solvedStats.basic.count} problems</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full">
                              <div className={`h-2 rounded-full ${getDifficultyBgColor('basic')}`} style={{ width: `${(gfgData.solvedStats.basic.count / gfgData.info.totalProblemsSolved) * 100}%` }}></div>
                            </div>
                          </div>
                          
                          {/* Easy */}
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className={`font-medium ${getDifficultyColor('easy')}`}>Easy</span>
                              <span className="text-sm text-gray-600">{gfgData.solvedStats.easy.count} problems</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full">
                              <div className={`h-2 rounded-full ${getDifficultyBgColor('easy')}`} style={{ width: `${(gfgData.solvedStats.easy.count / gfgData.info.totalProblemsSolved) * 100}%` }}></div>
                            </div>
                          </div>
                          
                          {/* Medium */}
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className={`font-medium ${getDifficultyColor('medium')}`}>Medium</span>
                              <span className="text-sm text-gray-600">{gfgData.solvedStats.medium.count} problems</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full">
                              <div className={`h-2 rounded-full ${getDifficultyBgColor('medium')}`} style={{ width: `${(gfgData.solvedStats.medium.count / gfgData.info.totalProblemsSolved) * 100}%` }}></div>
                            </div>
                          </div>
                          
                          {/* Hard */}
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className={`font-medium ${getDifficultyColor('hard')}`}>Hard</span>
                              <span className="text-sm text-gray-600">{gfgData.solvedStats.hard.count} problems</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full">
                              <div className={`h-2 rounded-full ${getDifficultyBgColor('hard')}`} style={{ width: `${(gfgData.solvedStats.hard.count / gfgData.info.totalProblemsSolved) * 100}%` }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>  
                  </div>   
                )}
              </>  
           )}

          </div>
        </div>  
      </div>
    </div>
  )
}
export default Dashboard    

          
