"use client"
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Vertex shader as a plain template literal
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;


// Updated fragment shader using a sine function for dynamic shimmer
const fragmentShader = `
  uniform float time;
  uniform vec3 baseColor;
  uniform float metalness;
  uniform float roughness;
  uniform float envMapIntensity;
  uniform sampler2D map;
  varying vec2 vUv;

  void main() {
    vec4 texColor = texture2D(map, vUv);
    float shimmer = sin(time * 5.0 + vUv.x * 10.0 + vUv.y * 10.0) * 0.5 + 0.5;
    vec3 gold = vec3(1.0, 0.85, 0.3);
    vec3 finalColor = mix(texColor.rgb, gold, shimmer * 0.3);
    gl_FragColor = vec4(finalColor, texColor.a);
  }
`;


// Create the custom shader material
const FluidShimmerMaterial = shaderMaterial(
  {
    time: 10,
    baseColor: new THREE.Color("#033"),
    metalness: 0.1,
    roughness: 0.9,
    envMapIntensity: .0,
    map: null,
  },
  vertexShader,
  fragmentShader
)

export { FluidShimmerMaterial }
