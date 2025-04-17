import React, { useEffect, useRef } from 'react';
import { IfcViewerAPI } from 'web-ifc-viewer';
import * as THREE from 'three';
import { loadIfcUrl } from './ifc-manager'; // 👈 chemin correct

const IfcViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<IfcViewerAPI | null>(null);

  // Initialisation du viewer
  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new IfcViewerAPI({
      container: containerRef.current,
      backgroundColor: new THREE.Color(0xf0f0f0), // fond gris clair
    });

    viewer.grid.setGrid();       // optionnel
    viewer.axes.setAxes();       // optionnel
    viewer.IFC.setWasmPath("/"); // chemin vers web-ifc.wasm dans public/

    viewerRef.current = viewer;

    return () => {
      viewerRef.current?.dispose();
    };
  }, []);

  // Gestion du chargement du fichier IFC
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !viewerRef.current) return;

    try {
      await loadIfcUrl(viewerRef.current, file); // 👈 fonction déportée
    }catch (error) {
      console.error("❌ Fichier IFC non chargé :", error);
      alert("Erreur : " + error);
    }
    
  };

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <input
        type="file"
        accept=".ifc"
        onChange={handleFileChange}
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 10,
          background: 'white',
          padding: '5px',
          borderRadius: '5px',
        }}
      />
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default IfcViewer;



























// import React, { useEffect, useRef } from 'react';
// import { IfcViewerAPI } from 'web-ifc-viewer';
// import * as THREE from 'three';

// const IFCViewer = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const viewerRef = useRef<any>(null);
//   const modelIDRef = useRef<number | null>(null); // Pour suivre le modèle chargé

//   // useEffect(() => {
//   //   if (!containerRef.current) return;

//   //   // Initialisation du viewer
//   //   const viewer = new IfcViewerAPI({
//   //     container: containerRef.current,
//   //     backgroundColor: new THREE.Color(0xffffff), // Fond blanc
//   //   });

//   //   // ❌ On n'ajoute pas de grille ni d'axes
//   //   // viewer.grid.setGrid();
//   //   // viewer.axes.setAxes();

//   //   // Définir le chemin vers le fichier .wasm
//   //   viewer.IFC.setWasmPath('/wasm/');
//   //   viewerRef.current = viewer;
//   // }, []);
//   const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     console.log('file',file);
    
//     // if (!file || !viewerRef.current) return;
  
//     // if (modelIDRef.current !== null) {
//     //   viewerRef.current.IFC.loader.ifcManager.removeModel(modelIDRef.current);
//     //   modelIDRef.current = null;
//     // }
  
//     // try {
//       // const ifcURL = URL.createObjectURL(file);
//       const model = await viewerRef.current.IFC.loadIfcUrl(file);
//       console.log('model',model);
      
  
//     //   if (model && model.modelID !== undefined) {
//     //     modelIDRef.current = model.modelID;
//     //     console.log('✅ Fichier IFC chargé avec succès');
//     //   } else {
//     //     console.error('❌ Erreur : modèle invalide ou non chargé.');
//     //   }
//     // } catch (err) {
//     //   console.error('❌ Erreur lors du chargement du fichier IFC :', err);
//     // }
//   };
  

//   return (
//     <>
//       <div style={{ padding: '10px', background: '#ffffff' }}>
//         <input type="file" accept=".ifc" onChange={handleFileChange} />
//       </div>
//       {/* <div ref={containerRef} style={{ height: '90vh', width: '100%' }} /> */}
//     </>
//   );
// };

// export default IFCViewer;
// src/components/IFCViewer.tsx