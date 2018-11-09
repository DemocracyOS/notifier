const React = require('react');
const ReactDom = require('react-dom/server');
const { Email, Item, Span, A, renderEmail, Box, Image } = require ('react-html-email');
const spanStyles = {
  width: 340,
  height: 125,
  fontSize: 16,
  lineHeight: 25,
}
const pStyle = {
  width: 317,
  height: 25,
  fontSize: 20,
  lineHeight: 1.25,
  textAlign: 'center',
  color: '#101a21',
}
const mailStyle = {
  width: 586,
  height: 347,
  fontSize: 16,
  lineHeight: 25,
  color: '#203340',
}

const CommentClosed = (props) => {
  return (
    <Email>
      <Box align="center" style={{width: 700, height: 136, border: 'solid 1px #e9e9e9', borderBottom: 'none'}}>
            <Item align="center" style={{border: 'solid 1px #e9e9e9'}}>
              <Image src='https://www.hcdn.gob.ar/system/modules/ar.gob.hcdn.frontend/resources/img/logo-hcdn-vertical.jpg' align="center" style={{width: 130, height: 98, margin: 25}} />
            </Item>

            <Item align="center" style={{display: "block", marginTop: 25, marginLeft: 191, marginRight: 191}}>
              <Span {...pStyle}>Elaboración de <Span style={{fontWeight: 'bold', fontSize: 20}}>Propuestas de Ley</Span></Span>
            </Item>

              <Item style={{display: "block", marginTop: 25, margin: 57}}>
                  <Span {...spanStyles}>
                  Hola {props.author},
                  </Span>
                  <Box style={{marginTop: 30}}>
                    <Item>
                      <Span {...mailStyle}>- Finalizó el periodo para realizar aportes en la propuesta de ley regulación de contaminación sonora en la que comentó. Ingrese en propuestasabiertas.hcdn.gob.ar (link) para ver la versión final y los resultados del proceso de co-creación de normas.</Span>
                    </Item>
                  </Box>
              </Item>
              <Box align="center" style={{width: 700, height:130, border: 'solid 1px #e9e9e9', borderTop: 'none', borderBottom: 'none'}}>
                <Item>
                        <Box align='center' style={{width: 371, height: 126, marginTop: 62, border: 'solid 1px #e9e9e9', position: 'relative'}}>
                          <Item>
                            <Image src="https://picsum.photos/371/126" style={{width: 371, height: 126}} />
                            <Box style={{width: 320, height: 96, backgroundColor: '#ffffff', position: 'absolute', top: 63, borderLeft: 'solid 1px #e9e9e9'}}>
                              <Item>
                                <Box style={{marginLeft: 17, position: 'absolute', marginTop: 14}}>
                                  <Item>
                                    <Span style={{fontSize: 12, color: '#5c97bc'}}>LIBERTAD DE EXPRESION</Span>
                                  </Item>
                                </Box>
                              </Item>
                              <Item>
                                <Box style={{marginLeft: 17, marginTop: 40}}>
                                  <Item>
                                    <Span style={{fontSize: 24, fontWeight: 'bold', lineHeight: 'normal'}}>Acceso a la información pública</Span>
                                  </Item>
                                </Box>
                              </Item>
                            </Box>
                          </Item>
                          <Item style={{width: 370, height: 163}}>
                            <Box style={{marginLeft: 17, marginTop: 49, marginBottom: 29}}>
                              <Item>
                                <Span {...spanStyles}>La presente Ley tiene por objeto garantizar el efectivo ejercicio del derecho de acceso a la información pública, promover la participación ciudadana y la transparencia de la gestión pública.</Span>
                              </Item>
                            </Box>
                          </Item>
                        </Box>
                </Item>
              </Box>

              <Box align="center" style={{width: 700, height: 126, borderBottom: 'solid 1px #e9e9e9', backgroundColor: '#5c98bd', marginTop: 100}}>
                <Item>
                  <Box align="center">
                    <Item align="center" style={{width: 535, height: 40, margin: 82, marginTop: 63}}>
                      <Span style={{color: 'white', fontSize: 13}}>Honorable Cámara de Diputados de la Nación Argentina | Congreso de la Nación Argentina | Av. Rivadavia 1864 - Ciudad Autónoma de Bs. As. (C.P.C1033AAV) | (54-11) 4127-7100</Span>
                    </Item>
                  </Box>
                </Item>
              </Box>
      </Box>
    </Email>
  );
}

module.exports = (props) => renderEmail(<CommentClosed {...props}/>);
