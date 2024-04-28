import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FiBell } from "react-icons/fi";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"; // Import Chakra UI components and icons

function Navbar() {
  const location = useLocation();
  const [access, setAccess] = useState(localStorage.getItem("logintoken"));
  const navigate = useNavigate();

  useEffect(() => {
    setAccess(localStorage.getItem("logintoken"));
  }, []);

  const handleTaskClick = () => {
    if (access) {
      navigate("/task");
    } else {
      navigate("/login");
    }
  };

  const logout = () => {
    localStorage.removeItem("logintoken");
    setAccess(null);
    navigate("/");
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="center"
      gap={24}
      py={3}
      px={6}
      boxShadow="md"
      bg={useColorModeValue("#ADBBDA", "gray.900")}
    >
      <Box position="absolute" left={4}>
        <Avatar
          size="sm"
          src="https://play-lh.googleusercontent.com/rk1U283B0HmQHfY159OagwkFWSpp_IKoLRWW7ND5UYIY8LrBuRbfPRHtHkqsXXce-Ws"
          alt="Profile"
        />
      </Box>
      {/* <Link
        to="/"
        className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
      >
        Home
      </Link> */}

      <Text mb={0.8}
      fontSize="medium"
      fontWeight="800"
        cursor="pointer"
        onClick={handleTaskClick}
        className={`nav-link ${
          location.pathname === "/task" ? "active" : ""
        }`}
      >
        Task
      </Text>

      {access ? (
        <Text mb={1}
        fontSize="medium"
      fontWeight="800"
          cursor="pointer"
          onClick={logout}
          className={`nav-link ${
            location.pathname === "/signup" ? "active" : ""
          }`}
        >
          Logout
        </Text>
      ) : (
        <Link
          to="/login"
          className={`nav-link ${
            location.pathname === "/login" ? "active" : ""
          }`}
        >
          Login
        </Link>
      )}

      <Flex align="center" position="absolute" right={6} gap={6}>
        <Button
          className="nav-icon"
          colorScheme="blue"
          variant="ghost"
          aria-label="Notification"
        >
          {/* <FiBell style={{ fontSize: "1.5rem" }} /> */}
        </Button>
        <Box position="relative">
          <Avatar
            size="sm"
            src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
            alt="Profile"
          />
          {access && (
            <Box
              position="absolute"
              right={0}
              bottom={0}
              w={3}
              h={3}
              bg="green.500"
              borderRadius="full"
              borderWidth={2}
              borderColor="white"
            ></Box>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}

export default Navbar;
