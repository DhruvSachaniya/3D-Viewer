import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Rhino3dmLoader, OrbitControls } from "three-stdlib";

const ThreeDMModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set fixed size for the viewer
    const width = 600;
    const height = 400;

    // Create a WebGL renderer and set it to the DOM element
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // Create a scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      width / height,
      0.1,
      1000
    );
    camera.position.set(10, 10, 10);

    // Add OrbitControls for mouse interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 1000;

    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
    }

    // Add lighting to the scene
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    const directional = new THREE.DirectionalLight(0xffffff, 1);
    directional.position.set(5, 10, 7.5);
    scene.add(ambient);
    scene.add(directional);

    // Load the Rhino 3DM file
    const loader = new Rhino3dmLoader();
    loader.setLibraryPath("https://cdn.jsdelivr.net/npm/rhino3dm@7.15.0/");

    loader.load(
      "/RhinoLogo.3dm",
      (object) => {
        console.log("✅ Test model loaded:", object);

        // Ensure each mesh has its own material instance
        object.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (Array.isArray(mesh.material)) {
              mesh.material = mesh.material.map(mat => mat.clone());
            } else {
              mesh.material = mesh.material.clone();
            }
          }
        });
        scene.add(object);

        // Compute bounding box and center the camera
        const box = new THREE.Box3().setFromObject(object);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Move camera to fit the model
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        cameraZ *= 1.5; // Add some padding
        camera.position.set(center.x, center.y, cameraZ + center.z);
        camera.lookAt(center);
        camera.updateProjectionMatrix();

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        // const lastSelected: THREE.Mesh | null = null;

        function isMeshStandardMaterial(mat: unknown): mat is THREE.MeshStandardMaterial {
          return (
            (typeof mat === 'object' && mat !== null && 'color' in mat && 'userData' in mat) ||
            mat instanceof THREE.MeshStandardMaterial
          );
        }

        renderer.domElement.addEventListener("click", (event) => {
          // Get bounding rect of renderer for correct mouse coords
          const rect = renderer.domElement.getBoundingClientRect();
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObjects(scene.children, true);

          if (intersects.length > 0) {
            const clicked = intersects[0].object;
            if ((clicked as THREE.Mesh).isMesh) {
              const mesh = clicked as THREE.Mesh;
              const material = mesh.material;
              if (isMeshStandardMaterial(material)) {
                // Toggle highlight color
                if (material.userData.isHighlighted) {
                  // Restore original color
                  if (material.userData.originalColor) {
                    material.color.copy(material.userData.originalColor);
                  }
                  material.userData.isHighlighted = false;
                } else {
                  // Store original color if not already
                  if (!material.userData.originalColor) {
                    material.userData.originalColor = material.color.clone();
                  }
                  material.color.set(0xff0000); // Highlight in red
                  material.userData.isHighlighted = true;
                }

                // Log mesh details
                let vertices = 0;
                let triangles = 0;
                if (mesh.geometry instanceof THREE.BufferGeometry) {
                  const pos = mesh.geometry.getAttribute('position');
                  vertices = pos ? pos.count : 0;
                  const idx = mesh.geometry.getIndex();
                  if (idx) {
                    triangles = idx.count / 3;
                  } else {
                    triangles = vertices / 3;
                  }
                }
                const bbox = new THREE.Box3().setFromObject(mesh);
                const size = bbox.getSize(new THREE.Vector3());
                console.log("Clicked mesh details:", {
                  name: mesh.name,
                  vertices,
                  triangles,
                  size: { x: size.x, y: size.y, z: size.z }
                });
              }
            }
          }
        });
      },
      undefined,
      (error) => {
        console.error("❌ Failed to load RhinoLogo.3dm:", error);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#111",
        margin: 0,
        padding: 0,
        // position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden"
      }}
    >
      <div
        ref={containerRef}
        style={{ width: 600, height: 400, boxShadow: "0 0 24px #000", borderRadius: 8, background: "#222" }}
      />
    </div>
  );
};

export default ThreeDMModel;
