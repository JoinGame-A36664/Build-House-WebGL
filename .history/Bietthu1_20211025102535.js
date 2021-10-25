"use strict";

var canvas;
var gl;

var theta = [0, 0, 0];
var uTheta;
var temp = 0;
var vertices = [
          vec3(-200, -200, 50), //1
          vec3(-150, -200, 50), //2
          vec3(-150, 100, 50), //3
          vec3(-200, 100, 50), //4
          vec3(150, -200, 50), //5
          vec3(200, -200, 50), //6
          vec3(200, 100, 50), //7
          vec3(150, 100, 50), //8
          vec3(-200, 200, 50), //9
          vec3(200, 200, 50), //10
          vec3(0, 350, 50), //11
          vec3(0, 350, 70), //12
          vec3(-200, 200, 70), //13
          vec3(200, 200, 70), //14
          vec3(200, 160, 50), //15
          vec3(0, 310, 50), //16
          vec3(0, 310, 250), //17
          vec3(200, 160, 250), //18
          vec3(-200, 160, 50), //19
          vec3(-200, 160, 250), //20
          vec3(-200, 100, 200), //21
          vec3(-200, 100, 150), //22
          vec3(-200, 160, 150), //23
          vec3(-200, 160, 200), //24
          vec3(200, 160, 200), //25
          vec3(200, 100, 200), //26
          vec3(200, 100, 150), //27
          vec3(200, 160, 150), //28
          vec3(-200, 200, -750), //29
          vec3(-200, -200, -750), //30
          vec3(200, -200, -450), //31
          vec3(200, -130, 50), //32
          vec3(200, -130, -450), //33
          vec3(200, -130, -20), //34
          vec3(200, -130, -120), //35
          vec3(200, 50, -120), //36
          vec3(200, 50, -20), //37
          vec3(200, 50, 50), //38
          vec3(200, -130, -280), //39
          vec3(200, -130, -380), //40
          vec3(200, 50, -380), //41
          vec3(200, 50, -280), //42
          vec3(200, 50, -450), //43
          vec3(200, 200, -450), //44
          vec3(440, -200, -450), //45
          vec3(440, 200, -450), //46
          vec3(270, -130, -450), //47
          vec3(370, -130, -450), //48
          vec3(370, 50, -450), //49
          vec3(270, 50, -450), //50
          vec3(440, -200, -750), //51
          vec3(440, 200, -750), //52
          vec3(440, -130, -450), //53
          vec3(440, 50, -450), //54
          vec3(0, 350, -600), //55
          vec3(440, 350, -600), //56
          vec3(460, 200, -450), //57
          vec3(460, 350, -600), //58
          vec3(460, 200, -750), //59
          vec3(-140, -200, 50), //60
          vec3(140, -200, 50), //61
          vec3(-140, 100, 50), //62
          vec3(140, 100, 50), //63
          vec3(150, 90, 50), //64
          vec3(-150, 90, 50), //65
          vec3(-150, 30, 50), //66
          vec3(-150, 20, 50), //67
          vec3(150, 20, 50), //68
          vec3(150, 30, 50), //69
          vec3(-200, -200, 200), //70
          vec3(200, -200, 200), //71
          vec3(-200, -230, 200), //72
          vec3(-200, -230, 50), //73
          vec3(200, -230, 50), //74
          vec3(200, -230, 200), //75
          vec3(230, -230, 230), //76
          vec3(230, -230, 50), //77
          vec3(-230, -230, 50), //78
          vec3(-230, -230, 230), //79
          vec3(230, -260, 230), //80
          vec3(230, -260, 50), //81
          vec3(-230, -260, 50), //82
          vec3(-230, -260, 230), //83
          vec3(260, -260, 50), //84
          vec3(260, -260, 260), //85
          vec3(-260, -260, 260), //86
          vec3(-260, -260, 50), //87
          vec3(260, -290, 260), //88
          vec3(260, -290, 50), //89
          vec3(-260, -290, 50), //90
          vec3(-260, -290, 260), //91
          vec3(-200, -290, 50), //92
          vec3(200, -290, 50), //93
          vec3(-200, -290, -750), //94
          vec3(200, -290, -450), //95
          vec3(440, -290, -450), //96
          vec3(440, -290, -750), //97
];

var vertexColors = [
          vec3(0.0, 0.0, 0.0),  // black
          vec3(1.0, 0.0, 0.0),  // red
          vec3(1.0, 1.0, 0.0),  // yellow
          vec3(0.0, 1.0, 0.0),  // green
          vec3(0.0, 0.0, 1.0),  // blue
          vec3(0.8, 0.0, 0.3),  // magenta
          vec3(0.8, 0.2, 0.1),  // cyan
          vec3(1.0, 1.0, 1.0),   // white
          vec3(0.9, 0.6, 0.5),
          vec3(0.8, 0.7, 0.4),
          vec3(0.4, 0.4, 0.5),
          vec3(0.6, 0.8, 0.7),

];
window.onload = function init() {
          canvas = document.getElementById("gl-canvas");

          gl = canvas.getContext('webgl2');
          if (!gl) alert("WebGL 2.0 isn't available");

          gl.viewport(0, 0, canvas.width, canvas.height);  // Vẽ khung nhìn trục canvas.width, canvas.height
          gl.clearColor(0.5, 0.5, 0.2, 1.0); // Tạo màu background

          gl.enable(gl.DEPTH_TEST);
          var program = initShaders(gl, "vertex-shader", "fragment-shader");
          gl.useProgram(program);

          var uUserCoordinates = gl.getUniformLocation(program, "uUserCoordinates"); // Khi mà xử lý xong uUserCoordinates từ js thì sẽ truyền dữ liệu sang webgl
          gl.uniform3f(uUserCoordinates, canvas.width, canvas.height, canvas.width); // **********

          uTheta = gl.getUniformLocation(program, "uTheta");
          gl.uniform3fv(uTheta, theta);  // **********



          buildHouse(program, vertices, vertexColors);

          document.getElementById("angle_x").onchange = function (event) {  // Chọn event angle từ html để xử lý
                    theta[0] = parseInt(event.target.value); // ********** 
                    buildHouse(program, vertices, vertexColors);

          };

          document.getElementById("angle_y").onchange = function (event) {
                    theta[1] = parseInt(event.target.value);
                    buildHouse(program, vertices, vertexColors);
          };

          document.getElementById("angle_z").onchange = function (event) {
                    theta[2] = parseInt(event.target.value);
                    buildHouse(program, vertices, vertexColors);
          };


          document.addEventListener("keydown", function (event) { // Nhận dữ liệu từ bàn phím 
                    console.log(event.key);
                    switch (event.key) { // ********** 
                              case "h":
                                        temp = 1; // ********** 
                                        buildHouse(program, vertices, vertexColors);
                                        break;
                              case "s":
                                        temp = 0;
                                        buildHouse(program, vertices, vertexColors);
                                        break;
                    }
          })


}

function buildHouse(program, vertices, vertexColors) // Truyền vào những gì và để làm gì ?
{
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

          gl.uniform3fv(uTheta, theta);



          buildrectangular(program, vertices[20], vertices[21], vertices[22], vertices[23], vertices[24], vertices[25], vertices[26], vertices[27], vertexColors[0], vertexColors[8]);
          // buildrectangular(program, vec3(150, -200, 200), vec3(200, -200, 200), vec3(200, 100, 200), vec3(150, 100, 200), vec3(150, 100, 150), vec3(150, -200, 150), vec3(200, -200, 150), vec3(200, 100, 150), vertexColors[0], vertexColors[8]);
          // buildrectangular(program, vec3(-200, -200, 200), vec3(-150, -200, 200), vec3(-150, 100, 200), vec3(-200, 100, 200), vec3(-200, 100, 150), vec3(-200, -200, 150), vec3(-150, -200, 150), vec3(-150, 100, 150), vertexColors[0], vertexColors[8]);

          if (temp == 0) {
                    wall(program, vertices[0], vertices[1], vertices[2], vertices[3], vertexColors[9]);
                    wall(program, vertices[4], vertices[5], vertices[6], vertices[7], vertexColors[9]);
                    wall(program, vertices[3], vertices[6], vertices[9], vertices[8], vertexColors[9]);
                    wall(program, vertices[8], vertices[9], vertices[10], vertices[8], vertexColors[9]);
                    ///
                    // wall(program, vertices[8], vertices[10], vertices[11], vertices[12], vertexColors[1]);
                    // wall(program, vertices[10], vertices[9], vertices[13], vertices[11], vertexColors[1]);
                    // màu mái front
                    wall(program, vertices[14], vertices[15], vertices[16], vertices[17], vertexColors[1]);
                    wall(program, vertices[18], vertices[19], vertices[16], vertices[15], vertexColors[1]);

                    // màu wall left
                    wall(program, vertices[0], vertices[8], vertices[28], vertices[29], vertexColors[2]);
                    // màu wall right
                    wall(program, vertices[5], vertices[30], vertices[32], vertices[31], vertexColors[6]);
                    wall(program, vertices[31], vertices[33], vertices[36], vertices[37], vertexColors[6]);
                    wall(program, vertices[34], vertices[38], vertices[41], vertices[35], vertexColors[6]);
                    wall(program, vertices[39], vertices[32], vertices[42], vertices[40], vertexColors[6]);
                    wall(program, vertices[9], vertices[43], vertices[42], vertices[37], vertexColors[6]);


                    wall(program, vertices[30], vertices[44], vertices[52], vertices[32], vertexColors[5]);
                    wall(program, vertices[32], vertices[46], vertices[49], vertices[42], vertexColors[5]);
                    wall(program, vertices[47], vertices[52], vertices[53], vertices[48], vertexColors[5]);
                    wall(program, vertices[42], vertices[43], vertices[45], vertices[53], vertexColors[5]);

                    // wall(program, vertices[45], vertices[51], vertices[55], vertices[45], vertexColors[4]);
                    // wall(program, vertices[50], vertices[51], vertices[45], vertices[44], vertexColors[4]);

                    // wall(program, vertices[28], vertices[29], vertices[50], vertices[51], vertexColors[3]);


                    wall(program, vertices[11], vertices[54], vertices[43], vertices[13], vertexColors[1]);
                    wall(program, vertices[12], vertices[11], vertices[54], vertices[28], vertexColors[1]);
                    wall(program, vertices[43], vertices[54], vertices[57], vertices[56], vertexColors[1]);
                    wall(program, vertices[28], vertices[54], vertices[57], vertices[58], vertexColors[1]);

                    wall(program, vertices[1], vertices[59], vertices[61], vertices[2], vertexColors[6]);
                    wall(program, vertices[62], vertices[7], vertices[4], vertices[60], vertexColors[6]);
                    wall(program, vertices[64], vertices[2], vertices[7], vertices[63], vertexColors[6]);
                    wall(program, vertices[65], vertices[66], vertices[67], vertices[68], vertexColors[6]);

                    wall(program, vertices[69], vertices[70], vertices[30], vertices[29], vertexColors[0]);
                    wall(program, vertices[29], vertices[30], vertices[44], vertices[50], vertexColors[0]);


                    wall(program, vertices[69], vertices[71], vertices[74], vertices[70], vertexColors[7]);
                    wall(program, vertices[5], vertices[73], vertices[74], vertices[70], vertexColors[7]);
                    wall(program, vertices[69], vertices[71], vertices[72], vertices[0], vertexColors[7]);
                    wall(program, vertices[78], vertices[75], vertices[76], vertices[77], vertexColors[0]);
                    wall(program, vertices[78], vertices[75], vertices[79], vertices[82], vertexColors[7]);
                    wall(program, vertices[75], vertices[76], vertices[80], vertices[79], vertexColors[7]);
                    wall(program, vertices[82], vertices[78], vertices[77], vertices[81], vertexColors[7]);
                    wall(program, vertices[83], vertices[84], vertices[85], vertices[86], vertexColors[0]);
                    wall(program, vertices[83], vertices[84], vertices[87], vertices[88], vertexColors[7]);
                    wall(program, vertices[85], vertices[84], vertices[87], vertices[90], vertexColors[7]);
                    wall(program, vertices[85], vertices[86], vertices[89], vertices[90], vertexColors[7]);
                    wall(program, vertices[88], vertices[83], vertices[89], vertices[86], vertexColors[7]);
                    wall(program, vertices[80], vertices[76], vertices[77], vertices[81], vertexColors[7]);


                    wall(program, vertices[5], vertices[92], vertices[94], vertices[30], vertexColors[10]);
                    wall(program, vertices[30], vertices[94], vertices[95], vertices[44], vertexColors[10]);
                    wall(program, vertices[44], vertices[95], vertices[96], vertices[50], vertexColors[10]);
                    wall(program, vertices[0], vertices[91], vertices[93], vertices[29], vertexColors[10]);
                    wall(program, vertices[50], vertices[96], vertices[93], vertices[29], vertexColors[10]);
                    wall(program, vertices[91], vertices[92], vertices[94], vertices[93], vertexColors[10]);
                    wall(program, vertices[96], vertices[95], vertices[94], vertices[93], vertexColors[10]);

          }

          // DrawWay(program, 8, vec3(-150, -290, 260), vec3(150, -290, 260), vec3(150, -290, 290), vec3(-150, -290, 290));

          // buildrectangular(program, vec3(-200, -290, 750), vec3(-200, 100, 750), vec3(-300, 100, 750), vec3(-300, -290, 750), vec3(-300, -290, 650), vec3(-200, -290, 650), vec3(-200, 100, 650), vec3(-300, 100, 650), vertexColors[0], vertexColors[11]);
          // buildrectangular(program, vec3(200, -290, 750), vec3(200, 100, 750), vec3(300, 100, 750), vec3(300, -290, 750), vec3(300, -290, 650), vec3(200, -290, 650), vec3(200, 100, 650), vec3(300, 100, 650), vertexColors[0], vertexColors[11]);


          // buildrectangular(program, vec3(-300, -290, 750), vec3(-300, -190, 750), vec3(-300, -190, 700), vec3(-300, -290, 700), vec3(-800, -290, 700), vec3(-800, -290, 750), vec3(-800, -190, 750), vec3(-800, -190, 700), vertexColors[0], vertexColors[11]);
          // buildrectangular(program, vec3(300, -290, 750), vec3(300, -190, 750), vec3(300, -190, 700), vec3(300, -290, 700), vec3(800, -290, 700), vec3(800, -290, 750), vec3(800, -190, 750), vec3(800, -190, 700), vertexColors[0], vertexColors[11]);
          // buildrectangular(program, vec3(800, -290, 750), vec3(850, -290, 750), vec3(850, 20, 750), vec3(800, 20, 750), vec3(800, 20, -800), vec3(800, -290, -800), vec3(850, -290, -800), vec3(850, 20, -800), vertexColors[0], vertexColors[11]);
          // buildrectangular(program, vec3(-800, -290, 750), vec3(-850, -290, 750), vec3(-850, 20, 750), vec3(-800, 20, 750), vec3(-800, 20, -800), vec3(-800, -290, -800), vec3(-850, -290, -800), vec3(-850, 20, -800), vertexColors[0], vertexColors[11]);




          // Drawfence(program, 16, vec3(320, -190, 730), vec3(330, -190, 730), vec3(330, 0, 730), vec3(320, 0, 730), vec3(320, 0, 720), vec3(320, -190, 720), vec3(330, -190, 720), vec3(330, 0, 720));
          // Drawfence(program, 16, vec3(-780, -190, 730), vec3(-770, -190, 730), vec3(-770, 0, 730), vec3(-780, 0, 730), vec3(-780, 0, 720), vec3(-780, -190, 720), vec3(-770, -190, 720), vec3(-770, 0, 720));


          quad(program, vertices[0], vertices[1], vertices[2], vertices[3], vertexColors[0]);
          quad(program, vertices[4], vertices[5], vertices[6], vertices[7], vertexColors[0]);
          quad(program, vertices[3], vertices[6], vertices[9], vertices[8], vertexColors[0]);
          //quad(program,vertices[8],vertices[9],vertices[10],vertices[8],vertexColors[0]);
          //quad(program,vertices[8],vertices[10],vertices[11],vertices[12],vertexColors[0]);
          //quad(program,vertices[10],vertices[9],vertices[13],vertices[11],vertexColors[0]);
          quad(program, vertices[14], vertices[15], vertices[16], vertices[17], vertexColors[0]);
          quad(program, vertices[18], vertices[19], vertices[16], vertices[15], vertexColors[0]);

          quad(program, vertices[0], vertices[8], vertices[28], vertices[29], vertexColors[0]);

          quad(program, vertices[5], vertices[30], vertices[32], vertices[31], vertexColors[0]);
          quad(program, vertices[31], vertices[33], vertices[36], vertices[37], vertexColors[0]);
          quad(program, vertices[34], vertices[38], vertices[41], vertices[35], vertexColors[0]);
          quad(program, vertices[39], vertices[32], vertices[42], vertices[40], vertexColors[0]);
          quad(program, vertices[9], vertices[43], vertices[42], vertices[37], vertexColors[0]);


          quad(program, vertices[30], vertices[44], vertices[52], vertices[32], vertexColors[0]);
          quad(program, vertices[32], vertices[46], vertices[49], vertices[42], vertexColors[0]);
          quad(program, vertices[47], vertices[52], vertices[53], vertices[48], vertexColors[0]);
          quad(program, vertices[42], vertices[43], vertices[45], vertices[53], vertexColors[0]);

          //quad(program,vertices[45],vertices[51],vertices[55],vertices[45],vertexColors[0]);
          quad(program, vertices[50], vertices[51], vertices[45], vertices[44], vertexColors[0]);

          quad(program, vertices[28], vertices[29], vertices[50], vertices[51], vertexColors[0]);


          quad(program, vertices[11], vertices[54], vertices[43], vertices[13], vertexColors[0]);
          quad(program, vertices[12], vertices[11], vertices[54], vertices[28], vertexColors[0]);
          quad(program, vertices[43], vertices[54], vertices[57], vertices[56], vertexColors[0]);
          quad(program, vertices[28], vertices[54], vertices[57], vertices[58], vertexColors[0]);

          quad(program, vertices[1], vertices[59], vertices[61], vertices[2], vertexColors[0]);
          quad(program, vertices[62], vertices[7], vertices[4], vertices[60], vertexColors[0]);
          quad(program, vertices[64], vertices[2], vertices[7], vertices[63], vertexColors[0]);
          quad(program, vertices[65], vertices[66], vertices[67], vertices[68], vertexColors[0]);

          //quad(program,vertices[69],vertices[70],vertices[30],vertices[29],vertexColors[0]);
          //quad(program,vertices[29],vertices[30],vertices[44],vertices[50],vertexColors[0]);

          quad(program, vertices[69], vertices[71], vertices[74], vertices[70], vertexColors[0]);
          quad(program, vertices[5], vertices[73], vertices[74], vertices[70], vertexColors[0]);
          quad(program, vertices[69], vertices[71], vertices[72], vertices[0], vertexColors[0]);
          quad(program, vertices[78], vertices[75], vertices[76], vertices[77], vertexColors[0]);
          quad(program, vertices[78], vertices[75], vertices[79], vertices[82], vertexColors[0]);
          quad(program, vertices[75], vertices[76], vertices[80], vertices[79], vertexColors[0]);
          quad(program, vertices[82], vertices[78], vertices[77], vertices[81], vertexColors[0]);
          quad(program, vertices[83], vertices[84], vertices[85], vertices[86], vertexColors[0]);
          quad(program, vertices[83], vertices[84], vertices[87], vertices[88], vertexColors[0]);
          quad(program, vertices[85], vertices[84], vertices[87], vertices[90], vertexColors[0]);
          quad(program, vertices[85], vertices[86], vertices[89], vertices[90], vertexColors[0]);

}


//////////////////////////////////////////////
// HỎI CÁCH HOẠT ĐỘNG TỪNG HÀM, DÙNG ĐỂ LÀM GÌ
// vẽ hàng dào
// function Drawfence(program, n, a, b, c, d, e, f, g, h) {
//           if (n == 0)
//                     return 0;
//           buildrectangular(program, a, b, c, d, e, f, g, h, vec3(0.0, 0.0, 0.0), vec3(0.6, 0.8, 0.7));
//           a[0] = a[0] + 30;
//           b[0] = b[0] + 30;
//           c[0] = c[0] + 30;
//           d[0] = d[0] + 30;
//           e[0] = e[0] + 30;
//           f[0] = f[0] + 30;
//           g[0] = g[0] + 30;
//           h[0] = h[0] + 30;
//           Drawfence(program, n - 1, a, b, c, d, e, f, g, h);
// }
function DrawWay(program, n, a, b, c, d) {
          if (n == 0) {
                    return 0;
          }
          if (!temp)
                    wall(program, a, b, c, d, vec3(0.6, 0.4, 0.4));
          quad(program, a, b, c, d, vec3(0.0, 0.0, 0.0));
          a[2] = a[2] + 40;
          b[2] = b[2] + 40;
          c[2] = c[2] + 40;
          d[2] = d[2] + 40;

          DrawWay(program, n - 1, a, b, c, d);
}
// xây dựng hình chữ nhật
function buildrectangular(program, a, b, c, d, e, f, g, h, colorq, colorw) {
          quad(program, a, b, c, d, colorq);
          quad(program, a, d, e, f, colorq);
          quad(program, a, b, g, f, colorq);
          quad(program, b, g, h, c, colorq);
          quad(program, d, c, h, e, colorq);
          quad(program, f, g, h, e, colorq);
          if (temp == 0) {
                    wall(program, a, b, c, d, colorw);
                    wall(program, a, d, e, f, colorw);
                    wall(program, a, b, g, f, colorw);
                    wall(program, b, g, h, c, colorw);
                    wall(program, d, c, h, e, colorw);
                    wall(program, f, g, h, e, colorw);
          }
}
function quad(program, a, b, c, d, e) {
          var indices = [a, b, c, d];
          var colors = [];
          for (var i = 0; i < indices.length; i++) {
                    colors.push(e);
          }
          supportRender(program, indices);
          supportColor(program, colors);
          gl.drawArrays(gl.LINE_LOOP, 0, indices.length);
}
function wall(program, a, b, c, d, e) {
          var pqt = [a, b, c, a, c, d];
          var colors2 = [];
          for (var i = 0; i < pqt.length; i++) {
                    colors2.push(e);
          }
          supportRender(program, pqt);
          supportColor(program, colors2);
          gl.drawArrays(gl.TRIANGLES, 0, pqt.length);
}
//////////////////////////////////////////////////////// 

function supportRender(program, vertices) {
          var vBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

          var aPosition = gl.getAttribLocation(program, "aPosition");
          gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(aPosition);
}

function supportColor(program, colors) {
          var cBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

          var aColors = gl.getAttribLocation(program, "aColor");
          gl.vertexAttribPointer(aColors, 3, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(aColors);
}


setTimeout(function () {
          buildHouse(program, vertices, vertexColors);
}, 300)