import * as turf from "@turf/turf";
import booleanOverlap from "@turf/boolean-overlap";

export const isPolygonValid = (
  newPolygonCoords: [number, number][],
  existingPolygons: { coordinates: [number, number][] }[]
): boolean => {
  const closedPolygon = [...newPolygonCoords, newPolygonCoords[0]];
  const newTurfPolygon = turf.polygon([closedPolygon]);

  return !existingPolygons.some((existingPolygon) => {
    const closedCoordsExistingPolygon = [
      ...existingPolygon.coordinates,
      existingPolygon.coordinates[0],
    ];

    const existingTurfPolygon = turf.polygon([closedCoordsExistingPolygon]);

    return booleanOverlap(existingTurfPolygon, newTurfPolygon);
  });
};

/*
const p0 = turf.polygon([[
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0],
    [0, 0]
  ]]);

 const oldone = [
    [
        [
            51.5123749154588,
            -0.15124058672103538
        ],
        [
            51.50884929989774,
            -0.12102675955520505
        ],
        [
            51.501690392607,
            -0.13252861421490628
        ],
        [
            51.50083552254009,
            -0.15038223935836872
        ],
        [
            51.505537109466715,
            -0.16051073823781128
        ],
        [
            51.5123749154588,
            -0.15124058672103538
        ]
    ]
]

 const arrnew = [
    [
        [
            51.51152024583139,
            -0.15501731511675668
        ],
        [
            51.506285044481096,
            -0.16463080557860724
        ],
        [
            51.50104924156018,
            -0.14609050254503544
        ],
        [
            51.50735350177636,
            -0.13579033419305556
        ],
        [
            51.51355006001528,
            -0.1381937068085182
        ],
        [
            51.51152024583139,
            -0.15501731511675668
        ]
    ]
]

  const p1 = turf.polygon([[
    [0, 0],
    [0, 2],
    [0.5, 2],
    [0.5, 0],
    [0, 0]
  ]])

  const p2 = turf.polygon([[
    [-2, -2],
    [-2, 2],
    [2, 2],
    [2, -2],
    [-2, -2]
  ]])

//   console.log(turf.booleanOverlap(p0, p2)); // ture
  return false;
*/
