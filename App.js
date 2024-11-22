// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Image,
//   TextInput,
//   Button,
//   Switch,
// } from "react-native";
// import axios from "axios";
// import { useCity } from "./src/helpers/context";
// const App = () => {
//   const {
//     city,
//     setCity,
//     forecast,
//     setForecast,
//     loading,
//     setLoading,
//     error,
//     setError,
//     isDarkTheme,
//     setIsDarkTheme,
//   } = useCity(); // Access the city from context
//   const API_KEY = "4fdee445e01671c69b9b807133286637"; // Replace with your OpenWeather API key

//   const lightTheme = {
//     backgroundColor: "#fff",
//     color: "#000",
//     borderColor: "",
//   };

//   const darkTheme = {
//     backgroundColor: "#000",
//     color: "#fff",
//     borderColor: "#fff",
//   };

//   const toggleTheme = () => {
//     setIsDarkTheme(!isDarkTheme);
//   };
//   // Use Effect to fetch data when city changes
//   useEffect(() => {
//     if (city) {
//       fetchWeatherData();
//     }
//   }, [city]); // Trigger fetch whenever city changes

//   const fetchWeatherData = async () => {
//     // Before fetching, clear previous errors and set loading state to true
//     setLoading(true);
//     setError(null); // Clear any previous error messages

//     try {
//       const response = await axios.get(
//         `https://api.openweathermap.org/data/2.5/forecast`,
//         {
//           params: {
//             q: city.trim() || "Coimbatore", // Get the city from context
//             units: "metric",
//             appid: API_KEY,
//           },
//         }
//       );

//       // Filter forecast data to get noon (12:00:00) entries
//       const dailyForecast = response.data.list.filter((item) =>
//         item.dt_txt.includes("12:00:00")
//       );

//       // Set the forecast data to state
//       setForecast(dailyForecast);
//       setLoading(false); // Done loading
//     } catch (err) {
//       // Handle errors gracefully
//       setError("Unable to fetch weather data. Please try again.");
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { weekday: "long", day: "numeric", month: "short" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const renderDay = ({ item }) => {
//     const temp = Math.round(item.main.temp);
//     const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

//     return (
//       <View
//         style={{
//           ...styles.card,
//           borderWidth: 1,
//           top: 10,
//           borderColor: isDarkTheme
//             ? darkTheme.borderColor
//             : lightTheme.borderColor,
//           backgroundColor: isDarkTheme
//             ? darkTheme.backgroundColor
//             : lightTheme.backgroundColor,
//         }}
//       >
//         <View>
//           <Text
//             style={{
//               ...styles.date,
//               color: isDarkTheme ? darkTheme.color : lightTheme.color,
//             }}
//           >
//             {item.dt_txt}
//           </Text>
//           <Text
//             style={{
//               ...styles.date,
//               fontSize: 13,
//               color: isDarkTheme ? darkTheme.color : lightTheme.color,
//             }}
//           >
//             {formatDate(item.dt_txt)}
//           </Text>
//         </View>
//         <Image source={{ uri: iconUrl }} style={styles.icon} />
//         <Text style={styles.temp}>{temp}°C</Text>
//       </View>
//     );
//   };

//   return (
//     <View
//       style={{
//         ...styles.container,
//         backgroundColor: isDarkTheme
//           ? darkTheme.backgroundColor
//           : lightTheme.backgroundColor,
//       }}
//     >
//       <View style={{flexDirection:'row',justifyContent:'flex-end',marginVertical:10}}>
//       <Text style={{color: isDarkTheme ? darkTheme.color : lightTheme.color}}>Light</Text>

//         <Switch value={isDarkTheme} onValueChange={toggleTheme} />
//         <Text style={{color: isDarkTheme ? darkTheme.color : lightTheme.color}}>Dark</Text>

//       </View>

//       {/* Search Bar */}
//       <TextInput
//         style={styles.searchBar}
//         placeholder="Enter city"
//         value={city}
//         onChangeText={(text) => {
//           setCity(text); // Update city in context
//           setError(null); // Clear error when city is updated
//         }}
//         color="black"
//       />
//       <Button title="Search" onPress={fetchWeatherData} />

//       {/* Display loading or error state */}
//       {error ? (
//         <Text style={styles.error}>{error}</Text>
//       ) : loading ? (
//         <Text style={styles.loading}>Loading...</Text>
//       ) : (
//         <FlatList
//           data={forecast}
//           renderItem={renderDay}
//           keyExtractor={(item, index) => index.toString()}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     padding: 20,
//   },
//   loading: {
//     flex: 1,
//     textAlign: "center",
//     fontSize: 18,
//     marginTop: 20,
//   },
//   error: {
//     color: "red",
//     fontSize: 16,
//     textAlign: "center",
//     marginVertical: 20,
//   },
//   searchBar: {
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingLeft: 10,
//     marginBottom: 20,
//   },
//   card: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#ffffff",
//     padding: 15,
//     marginVertical: 8,
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   date: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   icon: {
//     width: 50,
//     height: 50,
//   },
//   temp: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#ff7b54",
//   },
// });

// export default App;
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  Button,
  Switch,
} from "react-native";
import axios from "axios";
import { useCity } from "./src/helpers/context";

const App = () => {
  const {
    city,
    setCity,
    forecast,
    setForecast,
    loading,
    setLoading,
    error,
    setError,
    isDarkTheme,
    setIsDarkTheme,
  } = useCity(); // Access the city from context
  const API_KEY = "4fdee445e01671c69b9b807133286637"; // Replace with your OpenWeather API key

  const lightTheme = {
    backgroundColor: "#fff",
    color: "#000",
    borderColor: "",
  };

  const darkTheme = {
    backgroundColor: "#000",
    color: "#fff",
    borderColor: "#fff",
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Use Effect to fetch data when city changes
  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]); // Trigger fetch whenever city changes

  const fetchWeatherData = async () => {
    // Before fetching, clear previous errors and set loading state to true
    setLoading(true);
    setError(null); // Clear any previous error messages

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast`,
        {
          params: {
            q: city.trim() || "Coimbatore", // Get the city from context
            units: "metric",
            appid: API_KEY,
          },
        }
      );

      // Filter forecast data to get noon (12:00:00) entries
      const dailyForecast = response.data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      // Set the forecast data to state
      setForecast(dailyForecast);
      setLoading(false); // Done loading
    } catch (err) {
      // Handle errors gracefully
      setError("Unable to fetch weather data. Please try again.");
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: "long", day: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderDay = ({ item }) => {
    const temp = Math.round(item.main.temp);
    const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

    return (
      <View
        style={{
          ...styles.card,
          borderWidth: 1,
          top: 10,
          borderColor: isDarkTheme
            ? darkTheme.borderColor
            : lightTheme.borderColor,
          backgroundColor: isDarkTheme
            ? darkTheme.backgroundColor
            : lightTheme.backgroundColor,
        }}
      >
        <View>
          <Text
            style={{
              ...styles.date,
              color: isDarkTheme ? darkTheme.color : lightTheme.color,
            }}
          >
            {item.dt_txt}
          </Text>
          <Text
            style={{
              ...styles.date,
              fontSize: 13,
              color: isDarkTheme ? darkTheme.color : lightTheme.color,
            }}
          >
            {formatDate(item.dt_txt)}
          </Text>
        </View>
        <Image source={{ uri: iconUrl }} style={styles.icon} />
        <Text style={styles.temp}>{temp}°C</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDarkTheme
          ? darkTheme.backgroundColor
          : lightTheme.backgroundColor,
      }}
    >
    <View style={{flexDirection:'row',justifyContent:'flex-end',marginVertical:10}}>
      <Text style={{color: isDarkTheme ? darkTheme.color : lightTheme.color}}>Light</Text>

        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
        <Text style={{color: isDarkTheme ? darkTheme.color : lightTheme.color}}>Dark</Text>

      </View>


      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Enter city"
        value={city}
        onChangeText={(text) => {
          setCity(text); // Update city in context
          setError(null); // Clear error when city is updated
        }}
        color="black"
      />
      <Button title="Search" onPress={fetchWeatherData} />

      {/* Display loading or error state */}
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        <FlatList
          data={forecast}
          renderItem={renderDay}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // This makes sure the container takes full screen height
    padding: 20,
  },
  loading: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
  error: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  flatListContainer: {
    flexGrow: 1,
    paddingBottom: 10, // Optional padding at the bottom for better scrolling behavior
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  icon: {
    width: 50,
    height: 50,
  },
  temp: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff7b54",
  },
});

export default App;

